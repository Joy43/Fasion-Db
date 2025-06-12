// /lib/uploadToCloudinary.ts

export const uploadToCloudinary = async (file: {
  uri: string;
  type: string;
  name: string;
}): Promise<string | null> => {
  const formData = new FormData();

  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  } as any);
  formData.append('upload_preset', 'upload_car'); 

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dluuillmt/image/upload', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cloudinary error:', data);
      return null;
    }

    return data.secure_url;
  } catch (err) {
    console.error('Upload error:', err);
    return null;
  }
};
