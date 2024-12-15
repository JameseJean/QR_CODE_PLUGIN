// 创建悬浮图标
function createFloatingIcon() {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'qr-floating-icon';
    
    // 添加SVG图标
    iconContainer.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <style>
                .qr-box { fill: #1A1A1A; }
                .qr-elements { fill: #00F5FF; filter: drop-shadow(0 0 8px rgba(0, 245, 255, 0.8)); }
            </style>
            <rect class="qr-box" x="0" y="0" width="128" height="128" rx="16"/>
            <g class="qr-elements">
                <rect x="24" y="24" width="24" height="24"/>
                <rect x="80" y="24" width="24" height="24"/>
                <rect x="24" y="80" width="24" height="24"/>
                <rect x="56" y="56" width="16" height="16"/>
            </g>
        </svg>
    `;
    
    // 创建二维码容器（默认隐藏）
    const qrContainer = document.createElement('div');
    qrContainer.className = 'qr-container hidden';
    
    // 添加到页面
    document.body.appendChild(iconContainer);
    document.body.appendChild(qrContainer);
    
    // 点击事件处理
    iconContainer.addEventListener('click', async () => {
        qrContainer.classList.toggle('hidden');
        if (!qrContainer.classList.contains('hidden')) {
            // 获取当前页面信息
            const url = window.location.href;
            const title = document.title;
            const favicon = document.querySelector('link[rel*="icon"]')?.href;
            
            // 更新二维码内容
            updateQRCode(qrContainer, url, title, favicon);
        }
    });

    // 点击其他区域关闭二维码
    document.addEventListener('click', (event) => {
        if (!iconContainer.contains(event.target) && !qrContainer.contains(event.target)) {
            qrContainer.classList.add('hidden');
        }
    });
}

// 更新二维码内容
function updateQRCode(container, url, title, favicon) {
    container.innerHTML = `
        <div class="qr-wrapper">
            <div id="qrcode"></div>
            <div id="favicon-overlay"></div>
        </div>
        <div class="site-info">
            <h1 id="site-title">${title}</h1>
        </div>
    `;
    
    // 生成二维码
    new QRCode(container.querySelector('#qrcode'), {
        text: url,
        width: 180,
        height: 180,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // 设置favicon
    if (favicon) {
        const faviconOverlay = container.querySelector('#favicon-overlay');
        faviconOverlay.style.backgroundImage = `url(${favicon})`;
        faviconOverlay.style.backgroundSize = 'cover';
        faviconOverlay.style.backgroundPosition = 'center';
    }
}

// 注入样式
const style = document.createElement('style');
style.textContent = `
    .qr-floating-icon {
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 48px;
        height: 48px;
        background: #1A1A1A;
        border-radius: 12px;
        cursor: pointer;
        z-index: 999999;
        box-shadow: 0 0 20px rgba(0, 245, 255, 0.2);
        animation: glow 2s ease-in-out infinite alternate;
        transition: all 0.3s ease;
    }
    
    .qr-floating-icon:hover {
        transform: scale(1.1);
    }
    
    .qr-container {
        position: fixed;
        right: 20px;
        bottom: 80px;
        width: 300px;
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        z-index: 999998;
        padding: 20px;
        transition: all 0.3s ease;
        box-shadow: 0 0 30px rgba(0, 245, 255, 0.3);
    }
    
    .qr-container.hidden {
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
    }
    
    @keyframes glow {
        from { box-shadow: 0 0 20px rgba(0, 245, 255, 0.2); }
        to { box-shadow: 0 0 30px rgba(0, 245, 255, 0.4); }
    }
`;

document.head.appendChild(style);

// 确保DOM加载完成后再执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFloatingIcon);
} else {
    createFloatingIcon();
} 