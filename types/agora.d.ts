type AgoraChannel = {
  id: number;
  host_pass_phrase: string;
  viewer_pass_phrase: string;
  channel: string;
  title: string;
  pstn: null;
};

type AgoraToken = {
  token: string;
  user: {
    user_id: string;
    user_auid: number;
    screen_auid: number;
  };
};