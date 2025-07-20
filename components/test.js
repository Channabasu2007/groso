function extractYouTubeId(url) {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Examples:
console.log(extractYouTubeId("https://youtu.be/abc123XYZ78")); // abc123XYZ78
console.log(extractYouTubeId("https://www.youtube.com/watch?v=abc123XYZ78")); // abc123XYZ78
console.log(extractYouTubeId("https://www.youtube.com/embed/abc123XYZ78")); // abc123XYZ78
console.log(extractYouTubeId("https://youtube.com/shorts/abc123XYZ78")); // abc123XYZ78
