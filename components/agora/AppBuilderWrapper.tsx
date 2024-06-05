import AgoraAppBuilder from "@appbuilder/react";

export default function AppBuilderWrapper () {
  return (
    <div style={{ display: "flex", width: "100vw", height: "550px" }}>
      <AgoraAppBuilder.View />
    </div>
  );
};