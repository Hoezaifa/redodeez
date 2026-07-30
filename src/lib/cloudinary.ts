/**
 * Helper to upload custom print artwork files to Cloudinary.
 * Converts File to Cloudinary HTTPS URL or Data URL fallback if network/preset unavailable.
 */
export async function uploadArtworkToCloudinary(file: File): Promise<string> {
  const cloudName = "dsjnjbsgi";
  const uploadPreset = "deez_prints";

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      }
    }
  } catch (err) {
    console.warn("Cloudinary direct upload fallback to data URL:", err);
  }

  // Fallback: Convert to Data URL / Object URL string so preview & telegram payload work seamlessly
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}
