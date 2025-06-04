// services/cloudinary.ts
export const uploadToCloudinary = async (photo: {
  uri: string;
  type: string;
  name: string;
}): Promise<string | null> => {
  const data = new FormData();

  data.append('file', {
    uri: photo.uri,
    type: photo.type,
    name: photo.name,
  } as any);

  data.append('upload_preset', 'upload_car');
  data.append('cloud_name', 'dluuillmt');

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dluuillmt/image/upload', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return null;
  }
};