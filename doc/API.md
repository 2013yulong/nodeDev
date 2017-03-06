### 获取网络状态

当点击播放的时候判断下网络状态如果是非wifi则调用：
widgetApi.showNotifyDialog("非WiFi网络下播放视频将会消耗很多流量","","warn","继续播放","取消",userData);
将会显示提示浮层。
当用户点击确定或取消后将会执行js：onNotifyDialogButtonClick("ok/cancel",userData)
userData可以传任意类型数据，方便点击后js知道要对哪一个视频操作。
