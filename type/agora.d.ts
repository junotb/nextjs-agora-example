interface TokenResponse {
  token: string,
  user: {
    user_id: string,
    user_auid: number,
    screen_auid: number
  }
}  

interface ChannelResponse {
  id: number,
  title: string,
  channel: string,
  host_pass_phrase: string,
  viewer_pass_phrase: string,
  pstn: object | null
}

interface ResourceResponse {
  cname: string;
  uid: string;
  resourceId: string;
}

interface StartRecordingResponse {
  cname: string;
  uid: string
  resourceId: string;
  sid: string;
}