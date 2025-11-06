import { supabase } from './supabase';

/**
 * Upload a file to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} userId - The user's ID
 * @param {string} folder - Optional folder name (default: 'documents')
 * @returns {Promise<{success: boolean, path?: string, error?: string}>}
 */
export const uploadFileToStorage = async (file, userId, folder = 'documents') => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${folder}/${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('documents') // Storage bucket name
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName);

    return {
      success: true,
      path: fileName,
      url: publicUrl,
      filename: file.name,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Save case information to PostgreSQL
 * @param {Object} caseData - Case form data
 * @param {string} userId - The user's ID
 * @param {string} mainDocumentId - ID of the main document file record
 * @returns {Promise<{success: boolean, caseId?: string, error?: string}>}
 */
export const saveCaseToDatabase = async (caseData, userId, mainDocumentId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data, error } = await supabase
      .from('cases')
      .insert({
        user_id: userId,
        main_document_id: mainDocumentId,
        circuit_court: caseData.circuitCourt || null,
        county_court: caseData.countyCourt && caseData.countyCourt.trim() !== '' ? caseData.countyCourt : null, // Convert empty string to NULL
        related_cases: caseData.relatedCases || 'no',
        remedies_monetary: caseData.remedies?.monetary || false,
        remedies_non_monetary: caseData.remedies?.nonMonetary || false,
        remedies_declaratory: caseData.remedies?.declaratory || false,
        remedies_punitive: caseData.remedies?.punitive || false,
        class_action: caseData.classAction || 'no',
        jury_trial: caseData.juryTrial || 'yes',
        causes_of_action: caseData.causesOfAction || 1,
        defendants: caseData.defendants || 1,
        subpoenas: caseData.subpoenas || 0,
        complex_business: caseData.complexBusiness || 'no',
        case_type: caseData.caseType || null,
        other_case_type: caseData.otherCaseType && caseData.otherCaseType.trim() !== '' ? caseData.otherCaseType : null,
        claim_amount: caseData.claimAmount || null,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      success: true,
      caseId: data.id,
      caseData: data
    };
  } catch (error) {
    console.error('Error saving case:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Save main document metadata to PostgreSQL
 * @param {Object} documentData - Document information
 * @param {string} userId - The user's ID
 * @returns {Promise<{success: boolean, documentId?: string, error?: string}>}
 */
export const saveDocumentToDatabase = async (documentData, userId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data, error } = await supabase
      .from('documents')
      .insert({
        user_id: userId,
        filename: documentData.filename,
        original_filename: documentData.originalFilename,
        file_path: documentData.filePath,
        file_url: documentData.fileUrl,
        file_size: documentData.fileSize,
        file_type: documentData.fileType,
        document_type: documentData.documentType || 'main',
        status: 'uploaded',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      success: true,
      documentId: data.id,
      documentData: data
    };
  } catch (error) {
    console.error('Error saving document:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Save exhibit metadata to PostgreSQL
 * @param {Array} exhibits - Array of exhibit objects
 * @param {string} userId - The user's ID
 * @param {string} caseId - The case ID this exhibit belongs to
 * @param {string} mainDocumentId - The main document ID
 * @returns {Promise<{success: boolean, exhibitIds?: string[], error?: string}>}
 */
export const saveExhibitsToDatabase = async (exhibits, userId, caseId, mainDocumentId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    // Prepare exhibit data for batch insert
    const exhibitRecords = exhibits.map((exhibit, index) => ({
      user_id: userId,
      case_id: caseId,
      main_document_id: mainDocumentId,
      filename: exhibit.fileData?.filename || exhibit.name,
      original_filename: exhibit.name,
      file_path: exhibit.fileData?.path || null,
      file_url: exhibit.fileData?.url || null,
      file_size: exhibit.fileData?.size || exhibit.file?.size || 0,
      file_type: exhibit.fileData?.type || exhibit.file?.type || 'application/pdf',
      exhibit_identifier: exhibit.identifier || null,
      exhibit_order: index + 1,
      status: 'uploaded',
      created_at: new Date().toISOString()
    }));

    const { data, error } = await supabase
      .from('exhibits')
      .insert(exhibitRecords)
      .select();

    if (error) {
      throw error;
    }

    return {
      success: true,
      exhibitIds: data.map(ex => ex.id),
      exhibitsData: data
    };
  } catch (error) {
    console.error('Error saving exhibits:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Save complete case with documents and exhibits
 * @param {Object} submissionData - Complete submission data
 * @param {string} userId - The user's ID
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const saveCompleteSubmission = async (submissionData, userId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const results = {
      mainDocument: null,
      case: null,
      exhibits: []
    };

    let mainDocumentId = null;

    // 1. Upload and save main document
    if (submissionData.mainDocument) {
      const mainDoc = submissionData.mainDocument;
      
      // If file exists (new upload), upload it to storage
      if (mainDoc.file instanceof File) {
        const uploadResult = await uploadFileToStorage(
          mainDoc.file,
          userId,
          'main-documents'
        );

        if (!uploadResult.success) {
          throw new Error(`Failed to upload main document: ${uploadResult.error}`);
        }

        const docResult = await saveDocumentToDatabase({
          filename: uploadResult.path.split('/').pop(),
          originalFilename: uploadResult.filename,
          filePath: uploadResult.path,
          fileUrl: uploadResult.url,
          fileSize: uploadResult.size,
          fileType: uploadResult.type,
          documentType: 'main'
        }, userId);

        if (!docResult.success) {
          throw new Error(`Failed to save main document: ${docResult.error}`);
        }

        results.mainDocument = docResult.documentData;
        mainDocumentId = docResult.documentId;
      } else if (mainDoc.backendPath || mainDoc.backendFilename) {
        // File already uploaded to backend, just save metadata
        const docResult = await saveDocumentToDatabase({
          filename: mainDoc.backendFilename || mainDoc.name,
          originalFilename: mainDoc.name,
          filePath: mainDoc.backendPath || mainDoc.backendFilename,
          fileUrl: null, // Will need to be fetched from backend if needed
          fileSize: mainDoc.size || 0,
          fileType: mainDoc.type || 'application/pdf',
          documentType: 'main'
        }, userId);

        if (!docResult.success) {
          throw new Error(`Failed to save main document: ${docResult.error}`);
        }

        results.mainDocument = docResult.documentData;
        mainDocumentId = docResult.documentId;
      } else {
        // No file, just save metadata with name
        const docResult = await saveDocumentToDatabase({
          filename: mainDoc.name,
          originalFilename: mainDoc.name,
          filePath: `placeholder/${mainDoc.name}`,
          fileUrl: null,
          fileSize: mainDoc.size || 0,
          fileType: mainDoc.type || 'application/pdf',
          documentType: 'main'
        }, userId);

        if (!docResult.success) {
          throw new Error(`Failed to save main document: ${docResult.error}`);
        }

        results.mainDocument = docResult.documentData;
        mainDocumentId = docResult.documentId;
      }
    } else {
      throw new Error('Main document is required');
    }

    // 2. Save case information
    if (submissionData.caseData && mainDocumentId) {
      const caseResult = await saveCaseToDatabase(
        submissionData.caseData,
        userId,
        mainDocumentId
      );

      if (!caseResult.success) {
        throw new Error(`Failed to save case: ${caseResult.error}`);
      }

      results.case = caseResult.caseData;

      // 3. Upload and save exhibits
      if (submissionData.exhibits && submissionData.exhibits.length > 0) {
        const exhibitUploads = await Promise.all(
          submissionData.exhibits.map(exhibit => {
            if (exhibit.file instanceof File) {
              return uploadFileToStorage(exhibit.file, userId, 'exhibits');
            } else {
              // Exhibit file already exists or no file
              return Promise.resolve({ 
                success: true, 
                path: exhibit.backendPath || null,
                url: null,
                filename: exhibit.name,
                size: exhibit.size || 0,
                type: exhibit.type || 'application/pdf'
              });
            }
          })
        );

        // Add file data to exhibit objects
        const exhibitsWithFileData = submissionData.exhibits.map((exhibit, index) => ({
          ...exhibit,
          fileData: exhibitUploads[index]
        }));

        const exhibitsResult = await saveExhibitsToDatabase(
          exhibitsWithFileData,
          userId,
          caseResult.caseId,
          mainDocumentId
        );

        if (!exhibitsResult.success) {
          throw new Error(`Failed to save exhibits: ${exhibitsResult.error}`);
        }

        results.exhibits = exhibitsResult.exhibitsData;
      }
    }

    return {
      success: true,
      data: results
    };
  } catch (error) {
    console.error('Error saving complete submission:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get all cases for a user
 * @param {string} userId - The user's ID
 * @returns {Promise<{success: boolean, cases?: Array, error?: string}>}
 */
export const getUserCases = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select(`
        *,
        main_document:documents(*),
        exhibits:exhibits(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return {
      success: true,
      cases: data
    };
  } catch (error) {
    console.error('Error fetching user cases:', error);
    return {
      success: false,
      error: error.message,
      cases: []
    };
  }
};

/**
 * Get all documents/files for a user from Supabase
 * @param {string} userId - The user's ID
 * @returns {Promise<{success: boolean, files?: Array, error?: string}>}
 */
export const getUserFiles = async (userId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    // Get only process-queue documents for the user (exclude exhibits and main documents)
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .eq('document_type', 'process-queue') // Only show process-queue documents in UI
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Convert to format expected by MainContentArea
    const files = (data || []).map(doc => ({
      id: doc.id,
      filename: doc.filename,
      original_filename: doc.original_filename,
      path: doc.file_path,
      size: doc.file_size,
      type: doc.file_type,
      uploadDate: doc.created_at,
      fileUrl: doc.file_url
    }));

    return {
      success: true,
      files: files
    };
  } catch (error) {
    console.error('Error fetching user files:', error);
    return {
      success: false,
      error: error.message,
      files: []
    };
  }
};

/**
 * Delete a file from Supabase Storage and database
 * @param {string} userId - The user's ID
 * @param {string} filename - The filename to delete
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteFile = async (userId, filename) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    // Find the document in database
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .or(`filename.eq.${filename},original_filename.eq.${filename}`)
      .maybeSingle();

    if (docError && docError.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw docError;
    }

    // If document exists in database, delete from storage first
    if (document && document.file_path) {
      // Extract path from file_path (format: userId/folder/filename)
      const pathToDelete = document.file_path;
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([pathToDelete]);

      if (storageError) {
        console.warn('Error deleting from storage (file may not exist):', storageError);
        // Continue with database deletion even if storage deletion fails
      }
    }

    // Delete from database
    if (document) {
      const { error: deleteError } = await supabase
        .from('documents')
        .delete()
        .eq('id', document.id)
        .eq('user_id', userId);

      if (deleteError) {
        throw deleteError;
      }
    } else {
      // If not in database, try to delete from storage directly
      // Try different possible paths
      const possiblePaths = [
        `${userId}/main-documents/${filename}`,
        `${userId}/exhibits/${filename}`,
        `${userId}/process-queue/${filename}`,
        `${userId}/documents/${filename}`,
      ];

      for (const path of possiblePaths) {
        const { error } = await supabase.storage
          .from('documents')
          .remove([path]);
        
        if (!error) {
          break; // Successfully deleted
        }
      }
    }

    return {
      success: true,
      message: 'File deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting file:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get a signed URL for viewing/downloading a file
 * @param {string} filePath - The file path in storage
 * @param {number} expiresIn - URL expiration time in seconds (default: 3600)
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
export const getFileUrl = async (filePath, expiresIn = 3600) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Authentication required');
    }

    const { data, error } = await supabase.storage
      .from('documents')
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      throw error;
    }

    return {
      success: true,
      url: data.signedUrl
    };
  } catch (error) {
    console.error('Error getting file URL:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

