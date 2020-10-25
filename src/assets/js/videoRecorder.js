const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const recordPreview = document.getElementById("jsRecordPreview");

let stream;
let videoRecorder;

const handleVideoData = (e) => {
  const { data: videoFile } = e;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "record.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.innerHTML = "Start Recording";
  // eslint-disable-next-line no-use-before-define
  recordBtn.addEventListener("click", startRecording);
  recordBtn.removeEventListener("click", stopRecording);
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(stream);
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.removeEventListener("click", startRecording);
  recordBtn.addEventListener("click", stopRecording);
  recordBtn.innerHTML = "Stop Recording";
  videoRecorder.start();
};

const getVideo = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    recordPreview.srcObject = stream;
    recordPreview.play();
    recordBtn.innerHTML = "Start Recording";
    recordBtn.addEventListener("click", startRecording);
  } catch (error) {
    recordBtn.innerHTML = "😢 Cant record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

const init = () => {
  recordBtn.addEventListener("click", getVideo);
};

if (recordContainer) {
  init();
}
