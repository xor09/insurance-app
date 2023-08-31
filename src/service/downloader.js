
export const downloadFiles = (files) => {
    files.forEach((file, index) => {
      // Convert Base64 to binary
      const binaryData = atob(file.documentFile);
      
      // Create a Blob from the binary data
      const blob = new Blob([new Uint8Array([...binaryData].map(char => char.charCodeAt(0)))], {
        type: file.documentType || 'application/octet-stream'
      });

      // Create a downloadable link for the file
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = file.documentName;
      a.click();
      
      // Clean up the URL.createObjectURL
      URL.revokeObjectURL(a.href);
    });
  };