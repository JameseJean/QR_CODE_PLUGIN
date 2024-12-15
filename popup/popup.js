// 当弹出窗口加载完成时执行
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 获取当前活动标签页
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // 获取网页信息
        const url = tab.url;
        const title = tab.title;
        const favicon = tab.favIconUrl;

        // 显示网站标题
        document.getElementById('site-title').textContent = title;

        // 创建二维码
        const qrcode = new QRCode(document.getElementById('qrcode'), {
            text: url,
            width: 180,
            height: 180,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        // 设置favicon
        if (favicon) {
            const faviconOverlay = document.getElementById('favicon-overlay');
            faviconOverlay.style.backgroundImage = `url(${favicon})`;
            faviconOverlay.style.backgroundSize = 'cover';
            faviconOverlay.style.backgroundPosition = 'center';
        }

    } catch (error) {
        console.error('Error:', error);
    }
}); 