"use server";

import axios from "axios";

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

/**
 * 아고라 토큰을 생성합니다.
 * @returns {AgoraToken} 아고라 토큰 정보
 * @throws {Error} 토큰 생성 실패 시 에러를 던집니다.
 */
export const requestToken = async (): Promise<AgoraToken> => {
  try {
    const response = await axios.post(`${APP_BUILDER_HOST}/v1/token/generate`, {}, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
        "X-Project-ID": PROJECT_ID,
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("토큰 생성에 실패했습니다.");
  }
};

/**
 * 아고라 채널을 생성합니다.
 * @param {string} title - 아고라 채널 제목
 * @returns {AgoraChannel} 아고라 채널 정보
 * @throws {Error} 채널 생성 실패 시 에러를 던집니다.
 */
export const requestChannel = async (title: string): Promise<AgoraChannel> => {
  try {
    const response = await axios.post<AgoraChannel>(`${APP_BUILDER_HOST}/v1/channel`, { title, enable_pstn: false }, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
        "X-Project-ID": PROJECT_ID
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("채널 생성에 실패했습니다.");
  }
}

const acquireResource = async (cname: string, uid: string) => {
  const credential = await getCredential();

  /*{"cname":string,"uid":string,"resourceId":string}*/
  const data = await fetch(`https://api.agora.io/v1/apps/${APP_ID}/cloud_recording/acquire`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${credential}`
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
              "recording"
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
  const token = await requestToken();

  /*{"cname":string,"uid":string,"resourceId":string,"sid":string}*/
  const data = await fetch(`https://api.agora.io/v1/apps/${APP_ID}/cloud_recording/resourceid/${resourceId}/mode/mix/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${token}`
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
              "recording"
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