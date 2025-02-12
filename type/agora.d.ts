interface ChannelResponse {
  id: number,
  title: string,
  channel: string,
  host_pass_phrase: string,
  viewer_pass_phrase: string,
  pstn: object | null
}

interface TokenResponse {
  token: string,
  user: {
    user_id: string,
    user_auid: number,
    screen_auid: number
  }
}

interface JoinChannelResponse {
  channel_name: string,
  title: string,
  is_host: boolean,
  secret: string,
  chat?: {
    isGroupOwner: boolean,
    groupId: string,
    userToken: string,
    error: {
      code: number,
      message: string
    }
  },
  secret_salt: string,
  main_user?: {
    rtc: string,
    rtm: string,
    uid: number
  },
  screen_share_user?: {
    rtc: string,
    rtm: string,
    uid: number
  },
  whiteboard?: {
    room_token: string,
    room_uuid: string,
    error: {
      code: number,
      message: string
    }
  }
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