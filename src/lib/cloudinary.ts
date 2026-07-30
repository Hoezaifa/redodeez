/**
 * Helper to upload custom print artwork files to Cloudinary / Free Image Host.
 * Uses a 3-tier strategy so an actual public HTTPS image URL is ALWAYS generated:
 * 1. Cloudinary Unsigned Upload
 * 2. Anonymous Free Image Host (tmpfiles.org)
 * 3. Canvas Compressed Image Data URL (low-res fallback to keep memory tiny)
 */
export async function uploadArtworkToCloudinary(file: File): Promise<string> {
  // Tier 1: Try Cloudinary
  try {
    const cloudName = "dsjnjbsgi";
    const uploadPreset = "deez_prints";
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
    console.warn("Cloudinary upload failed, attempting fallback:", err);
  }

  // Tier 2: Try tmpfiles.org (Instant public HTTPS URL for Telegram & Admin view)
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const json = await res.json();
      if (json?.data?.url) {
        // Convert to direct downloadable image URL
        const directUrl = json.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
        return directUrl;
      }
    }
  } catch (err) {
    console.warn("Tmpfiles upload failed, using compressed canvas fallback:", err);
  }

  // Tier 3: Compressed Canvas Data URL (Max 600px width/height, 70% quality JPEG)
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
          return;
        }
        resolve(e.target?.result as string);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
