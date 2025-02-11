'use server'

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

const appBuilderHeader = {
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY,
    'X-Project-ID': PROJECT_ID,
  }
}

const authHeader = {
  auth: {
    username: APP_ID,
    password: APP_CERTIFICATE,
  }
}

/**
 * 채널 생성 API 호출
 * @param {string} title 채널 제목
 * @returns {Promise<ChannelResponse>} 채널 응답
 * @throws {Error} 채널 생성 실패
 */
const requestChannel = async (title: string): Promise<ChannelResponse> => {
  const response = await axios.post(
    `${APP_BUILDER_HOST}/v1/channel`,
    {
      title: title,
      enable_pstn: false,
    },
    appBuilderHeader
  );
  return response.data;
}

/**
 * Agora 토큰 생성 API 호출
 * @returns {Promise<TokenResponse>} 토큰 응답
 * @throws {Error} 토큰 생성 실패
 */
const requestToken = async (): Promise<TokenResponse> => {
  try {
    const response = await axios.post(
      `${APP_BUILDER_HOST}/v1/token/generate`,
      {},
      appBuilderHeader
    );
    return response.data;
  } catch (error: any) {
    console.error("Agora 토큰 생성에 실패했습니다.:", error.response?.data || error.message);
    throw new Error('토큰 생성에 실패했습니다.');
  }
};

/**
 * 녹화 리소스 획득 API 호출
 * @param {string} cname 채널 이름
 * @param {string} uid 사용자 ID
 * @returns {Promise<ResourceResponse>} 녹화 리소스 응답
 * @throws {Error} 녹화 리소스 획득 실패
 */
const acquireResource = async (cname: string, uid: string): Promise<ResourceResponse> => {
  try {
    const response = await axios.post(
      `https://api.agora.io/v1/apps/${APP_ID}/cloud_recording/acquire`,
      {
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
      },
      authHeader
    );
    return response.data;
  } catch (error: any) {
    console.error("Agora 녹화 리소스 획득에 실패했습니다.:", error.response?.data || error.message);
    throw new Error('녹화 리소스 획득에 실패했습니다.');
  }
};

/**
 * 녹화 시작 API 호출
 * @param {string} token 토큰
 * @param cname 채널 이름
 * @param uid 사용자 ID
 * @param resourceId 녹화 리소스 ID
 * @returns {Promise<StartRecordingResponse>} 녹화 시작 응답
 * @throws {Error} 녹화 시작 실패
 */
const startRecording = async (token: string, cname: string, uid: string, resourceId: string): Promise<StartRecordingResponse> => {
  try {
    const response = await axios.post(
      `https://api.agora.io/v1/apps/${APP_ID}/cloud_recording/resourceid/${resourceId}/mode/mix/start`,
      {
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
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Agora 녹화 시작에 실패했습니다.:", error.response?.data || error.message);
    throw new Error('녹화 시작에 실패했습니다.');
  }
};

export { requestChannel, requestToken, acquireResource, startRecording };