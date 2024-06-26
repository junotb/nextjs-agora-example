const APP_BUILDER_HOST = process.env.AGORA_APP_BUILDER_HOST!;
const API_KEY = process.env.AGORA_API_KEY!;
const PROJECT_ID = process.env.AGORA_PROJECT_ID!;

const API_HOST = process.env.AGORA_API_HOST!;
const APP_ID = process.env.AGORA_APP_ID!;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE!;
const CUSTOMER_ID = process.env.AGORA_CUSTOMER_ID!;
const CUSTOMER_CERTIFICATE = process.env.AGORA_CUSTOMER_CERTIFICATE!;

const S3_BUCKET = process.env.S3_BUCKET!;
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY!;
const S3_SECRET_KEY = process.env.S3_SECRET_KEY!;

const getCredential = async () => {
  return btoa(`${APP_ID}:${APP_CERTIFICATE}`);
};

export const createToken = async () => {
  /*{"token":string,"user":{"user_id":string,"user_auid":number,"screen_auid":number}}*/
  const data = await fetch('/api/agora/token/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
      'X-Project-ID': PROJECT_ID,
    },
  }).then(response => response.json());
  
  if (!data) return null;
  return {
    token: data.token,
  };
};

export const createChannel = async (title: string) => {
  /*{"id":number,"host_pass_phrase":string,"viewer_pass_phrase":string,"channel":string,"title":string,"pstn":null}*/
  const data = await fetch(`${APP_BUILDER_HOST}/v1/channel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
      'X-Project-ID': PROJECT_ID
    },
    body: JSON.stringify({
      title: title,
      enable_pstn: false,
    }),
  }).then(response => response.json());
  
  if (!data) return null;
  return {
    channel: data.channel,
    host_pass_phrase: data.host_pass_phrase,
    viewer_pass_phrase: data.viewer_pass_phrase,
  };
}

const acquireResource = async (cname: string, uid: string) => {
  const credential = await getCredential();

  /*{"cname":string,"uid":string,"resourceId":string}*/
  const data = await fetch(`https://api.agora.io/v1/apps/${APP_ID}/cloud_recording/acquire`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credential}`
    },
    body: JSON.stringify({
      cname: cname,
      uid: uid,
      clientRequest: {
        startParameter: {
          storageConfig: {
            vendor: 1,
            region: 0,
            bucket: S3_BUCKET,
            accessKey: S3_ACCESS_KEY,
            secretKey: S3_SECRET_KEY,
            fileNamePrefix: [
              'recording'
            ]
          }            
        }
      }
    }),
  }).then(response => response.json());
  
  if (!data) return null;
  return data;
}

const startRecording = async (cname: string, uid: string, resourceId: string) => {
  const token = await createToken();

  /*{"cname":string,"uid":string,"resourceId":string,"sid":string}*/
  const data = await fetch(`https://api.agora.io/v1/apps/${APP_ID}/cloud_recording/resourceid/${resourceId}/mode/mix/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`
    },
    body: JSON.stringify({
      cname: cname,
      uid: uid,
      clientRequest: {
        startParameter: {
          storageConfig: {
            vendor: 1,
            region: 0,
            bucket: S3_BUCKET,
            accessKey: S3_ACCESS_KEY,
            secretKey: S3_SECRET_KEY,
            fileNamePrefix: [
              'recording'
            ]
          }            
        }
      }
    }),
  })
    .then(response => response.json());
  
  if (!data) return null;
  return data;
}