const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const recordPreview = document.getElementById("jsRecordPreview");

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    recordPreview.srcObject = stream;
    recordPreview.play();
  } catch (error) {
    recordBtn.innerHTML = "😢 Cant record";
  }
};

const init = () => {
  startRecording();
};

if (recordContainer) {
  init();
}
