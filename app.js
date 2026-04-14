const app = document.getElementById('app');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

const state = {
  page: 'cover',
  mapMode: 'today',
  currentNode: 'tailor',
};

const nodes = {
  tailor: { name: '裁缝铺', desc: '手艺、布料与街坊人情交织的空间。' },
  tofu: { name: '豆腐坊', desc: '清晨豆香与水汽构成日常劳动节奏。' },
  pavilion: {
    name: '庄亭（西施妆亭）',
    desc: '庄亭位于西兴古镇水边，相传西施曾在此整装待渡，北上入吴，因此这里也被称为“西施妆亭”。在本片中，庄亭既是现实中的停留空间，也是连接地方传说、历史记忆与今昔对照的重要节点。',
  },
  alley: { name: '街巷', desc: '流动记忆的线性空间，连接个体与集体。' },
  museum: { name: '过塘行码头专项陈列馆', desc: '汇集旧照与地方志的材料场。' },
};

const videoSources = {
  tailor: './assets/videos/tailor_web.mp4',
  tofu: './assets/videos/tofu_web.mp4',
  alley: './assets/videos/street_web.mp4',
  museum: './assets/videos/museum_web.mp4',
  pavilion: './assets/videos/zhuangting_web.mp4',
};

const mapImages = {
  today: './assets/images/maps/map_today_xixing.png',
};

function renderVideoBlock(nodeKey, label = '节点视频') {
  const src = videoSources[nodeKey];
  return `
    <div class="video-block">
      <video controls preload="metadata" playsinline class="node-video">
        <source src="${src}" type="video/mp4" />
        您的浏览器无法播放该视频，请检查文件路径或视频格式。
      </video>
      <p class="video-caption">${label}</p>
    </div>
  `;
}

const bottomNav = `
  <div class="bottom-nav">
    <strong>节点跳转：</strong>
    <button class="btn" data-go-node="tailor">裁缝铺</button>
    <button class="btn" data-go-node="tofu">豆腐坊</button>
    <button class="btn" data-go-node="pavilion">庄亭（西施妆亭）</button>
    <button class="btn" data-go-node="alley">街巷</button>
    <button class="btn" data-go-node="museum">过塘行码头专项陈列馆</button>
    <button class="btn" data-go="album">相册里的西兴</button>
    <button class="btn" data-go="map">返回地图</button>
  </div>
`;

function render() {
  switch (state.page) {
    case 'cover':
      app.innerHTML = renderCover();
      break;
    case 'map':
      app.innerHTML = renderMap();
      break;
    case 'node':
      app.innerHTML = renderNode(state.currentNode);
      break;
    case 'album':
      app.innerHTML = renderAlbum();
      break;
    case 'form':
      app.innerHTML = renderForm();
      break;
    case 'ending':
      app.innerHTML = renderEnding();
      break;
    default:
      state.page = 'cover';
      app.innerHTML = renderCover();
      break;
  }
}

function renderCover() {
  return `
    <section class="page cover">
      <div class="card cover-inner">
        <h1>《在西兴》</h1>
        <p>一座被展示、也仍在生活的古镇</p>
        <button class="btn" data-go="map">进入地图</button>
      </div>
    </section>
  `;
}

function renderMapHotspots(isToday) {
  return `
    <div class="map-hotspots">
      <button class="hotspot" style="left:20%;top:26%" data-go-node="museum">陈列馆</button>
      <button class="hotspot" style="left:24%;top:63%" data-go-node="tofu">豆腐坊</button>
      <button class="hotspot" style="left:50%;top:49%" data-go-node="pavilion">庄亭</button>
      <button class="hotspot" style="left:73%;top:28%" data-go-node="tailor">裁缝铺</button>
      <button class="hotspot" style="left:73%;top:69%" data-go-node="alley">街巷</button>
      <button class="hotspot" style="left:50%;top:84%" data-go="album">相册里的西兴</button>
      ${
        isToday
          ? ''
          : '<button class="hotspot" style="left:28%;top:78%" data-modal="xishiLegend">庄亭 / 西施妆亭传说资料</button>'
      }
    </div>
  `;
}

function renderMap() {
  const isToday = state.mapMode === 'today';

  return `
    <section class="page">
      <h2>主地图</h2>
      <div>
        <button class="tab-btn" data-map-mode="today">今日西兴</button>
        <button class="tab-btn" data-map-mode="history">昔日西兴</button>
      </div>

      <div class="map-layout">
        <div class="map-board card">
          <div class="map-layer ${isToday ? 'today' : 'history'}">
            ${
              isToday
                ? `<img class="today-map-image" src="${mapImages.today}" alt="今日西兴地图" />`
                : ''
            }
            <h3 class="map-title">${isToday ? '今日西兴地图层' : '昔日西兴历史层'}</h3>
            ${renderMapHotspots(isToday)}
          </div>
        </div>

        <aside class="side-panel card">
          <h3>${isToday ? '地图说明（今日）' : '历史资料层（昔日）'}</h3>
          <p>${
            isToday
              ? '点击地图热点进入节点页面，观看节点影像并查看相关资料。'
              : '昔日层包含老地图、历史照片、地方志资料与庄亭传说入口。'
          }</p>
          ${
            isToday
              ? ''
              : `<div class="old-materials">
                  <h4>昔日西兴资料</h4>
                  <ul>
                    <li><button class="btn" data-modal="oldMap">老地图</button></li>
                    <li><button class="btn" data-modal="oldPhotos">历史照片</button></li>
                    <li><button class="btn" data-modal="gazetteer">地方志资料</button></li>
                    <li><button class="btn" data-modal="xishiLegend">庄亭（西施妆亭）传说入口</button></li>
                  </ul>
                </div>`
          }
        </aside>
      </div>
    </section>
  `;
}

function renderNode(nodeKey) {
  const node = nodes[nodeKey];
  if (!node) return '';

  const topRight =
    nodeKey === 'pavilion'
      ? `
      <div class="detail-hotspots">
        <button class="btn" data-modal="xishiLegend">查看西施妆亭</button>
        <button class="btn" data-modal="nowThen">查看今昔对照</button>
        <button class="btn" data-about="${nodeKey}">关于此点</button>
      </div>
    `
      : `<button class="btn" data-about="${nodeKey}">关于此点</button>`;

  let nodeMainContent = '';

  if (nodeKey === 'tailor') {
    nodeMainContent = `
      ${renderVideoBlock('tailor', '裁缝铺影像')}
      <div class="detail-hotspots">
        <button class="btn" data-modal="detailA">细节热点A</button>
        <button class="btn" data-modal="detailB">细节热点B</button>
      </div>
      <p>${node.desc}</p>
    `;
  } else if (nodeKey === 'tofu') {
    nodeMainContent = `
      ${renderVideoBlock('tofu', '豆腐坊影像')}
      <div class="detail-hotspots">
        <button class="btn" data-modal="detailA">细节热点A</button>
        <button class="btn" data-modal="detailB">细节热点B</button>
      </div>
      <p>${node.desc}</p>
    `;
  } else if (nodeKey === 'alley') {
    nodeMainContent = `
      ${renderVideoBlock('alley', '街巷影像')}
      <div class="detail-hotspots">
        <button class="btn" data-modal="detailA">细节热点A</button>
        <button class="btn" data-modal="detailB">细节热点B</button>
      </div>
      <p>${node.desc}</p>
    `;
  } else if (nodeKey === 'pavilion') {
    nodeMainContent = `
      ${renderVideoBlock('pavilion', '庄亭影像')}
      <div class="detail-hotspots">
        <button class="btn" data-modal="detailA">细节热点A</button>
        <button class="btn" data-modal="detailB">细节热点B</button>
      </div>
      <p>${node.desc}</p>
    `;
  } else if (nodeKey === 'museum') {
    nodeMainContent = `
      <div class="collection-layout">
        <div>
          ${renderVideoBlock('museum', '过塘行码头专项陈列馆影像')}
        </div>
        <div class="card side-panel">
          <h4>资料列表</h4>
          <ul class="material-list">
            <li><button class="btn" data-modal="oldPhotos">老照片</button></li>
            <li><button class="btn" data-modal="labels">展签</button></li>
            <li><button class="btn" data-modal="oldMap">地图</button></li>
            <li><button class="btn" data-modal="catalog">图录</button></li>
            <li><button class="btn" data-modal="xishiLegend">庄亭相关资料</button></li>
          </ul>
        </div>
      </div>
      <div class="detail-hotspots">
        <button class="btn" data-modal="detailA">细节热点A</button>
        <button class="btn" data-modal="detailB">细节热点B</button>
      </div>
      <p>${node.desc}</p>
    `;
  }

  return `
    <section class="page">
      <div class="node-topbar">
        <button class="btn" data-go="map">← 返回地图</button>
        ${topRight}
      </div>
      <h2>${node.name}</h2>
      ${nodeMainContent}
      ${bottomNav}
    </section>
  `;
}

function renderAlbum() {
  const items = Array.from({ length: 8 }, (_, i) => i + 1)
    .map((n) => `<button class="photo-item" data-modal="photo${n}">照片 ${n}<br />点击查看详情</button>`)
    .join('');

  return `
    <section class="page">
      <button class="btn" data-go="map">← 返回地图</button>
      <h2>相册里的西兴</h2>
      <p>以照片墙汇集个人记忆，点击任意图片查看详情。</p>
      <div class="photo-grid">${items}</div>
      <div style="margin-top:16px;">
        <button class="btn" data-go="form">分享你相册里的西兴</button>
        <button class="btn" data-go="ending">进入收束页</button>
      </div>
    </section>
  `;
}

function renderForm() {
  return `
    <section class="page">
      <button class="btn" data-go="album">← 返回相册</button>
      <h2>相册提交表单</h2>
      <form class="card" style="padding:16px;">
        <div class="form-grid">
          <label>昵称<input type="text" placeholder="请输入昵称" /></label>
          <label>联系方式<input type="text" placeholder="邮箱/电话" /></label>
          <label class="full">上传图片<input type="file" /></label>
          <label>拍摄时间<input type="date" /></label>
          <label>地点<input type="text" placeholder="例如：西兴古镇街巷" /></label>
          <label class="full">一句话描述<textarea rows="4" placeholder="写下你的记忆..."></textarea></label>
          <label class="full"><input type="checkbox" /> 我同意授权用于《在西兴》展示</label>
        </div>
        <div style="margin-top:12px;">
          <button type="button" class="btn" data-modal="submitInfo">提交说明</button>
        </div>
      </form>
    </section>
  `;
}

function renderEnding() {
  return `
    <section class="page ending">
      <div class="card">
        <h2>收束</h2>
        <p>潮声缓慢，旧桥与新路共同延伸。你已走过一段在西兴的地图叙事。</p>
        <button class="btn" data-go="map">返回地图</button>
        <button class="btn" data-go="cover">重新进入</button>
      </div>
    </section>
  `;
}

function openModal(type, context = {}) {
  const modalMap = {
    about: `
      <h3>关于此点：${nodes[context.node]?.name || ''}</h3>
      <p><strong>地点背景：</strong>${nodes[context.node]?.desc || ''}</p>
      <p><strong>作品作用：</strong>作为“人-地-记忆”关系的叙事节点，连接地图与影像段落。</p>
      <p><strong>推荐观看路径：</strong>地图 → 节点 → 陈列馆资料 → 相册。</p>
      <div>
        <button class="btn" data-close-modal>关闭</button>
        <button class="btn" data-go="map">返回地图</button>
        <button class="btn" data-go="album">查看相关内容</button>
      </div>
    `,
    xishiLegend: `
      <h3>庄亭 / 西施妆亭</h3>
      <div class="compare">
        <div>
          <div class="img-ph">现实图占位</div>
          <p>现实层：庄亭临水而立，是当下影像的停留点。</p>
        </div>
        <div>
          <div class="img-ph">历史图占位</div>
          <p>历史层：相传西施在此整装待渡，北上入吴。</p>
        </div>
      </div>
      <p>西施整装待渡的传说，让庄亭不只是现实空间节点，也成为连接地方记忆与历史想象的重要地点。</p>
      <div>
        <button class="btn" data-close-modal>关闭</button>
        <button class="btn" data-modal="nowThen">查看今昔对照</button>
        <button class="btn" data-go-node="pavilion">返回庄亭</button>
      </div>
    `,
    nowThen: `
      <h3>今昔对照</h3>
      <div class="compare">
        <div class="img-ph">今日影像占位</div>
        <div class="img-ph">昔日档案占位</div>
      </div>
      <p>通过空间轮廓、渡口位置与街巷走向，对比古镇肌理变化。</p>
    `,
    oldMap: `<h3>老地图资料</h3><div class="img-ph">老地图占位</div><p>可替换为历史地图扫描件。</p>`,
    oldPhotos: `<h3>历史照片</h3><div class="img-ph">历史照片占位</div><p>可放置同地点不同年代照片。</p>`,
    gazetteer: `<h3>地方志资料</h3><p>摘录占位：与西兴渡口、街巷、手工业相关条目。</p>`,
    labels: `<h3>展签资料</h3><p>陈列馆展签文本占位。</p>`,
    catalog: `<h3>图录资料</h3><p>图录页面占位，可替换为PDF截图。</p>`,
    detailA: `<h3>细节热点 A</h3><p>镜头细节说明占位。</p>`,
    detailB: `<h3>细节热点 B</h3><p>口述片段说明占位。</p>`,
    submitInfo: `<h3>提交说明</h3><p>原型中不真正上传，后续可接入后端接口。</p>`,
  };

  if (type.startsWith('photo')) {
    modalContent.innerHTML = `
      <h3>照片详情：${type.replace('photo', '照片 ')}</h3>
      <div class="img-ph">照片大图占位</div>
      <p>拍摄时间：20XX-XX-XX</p>
      <p>地点：杭州西兴古镇</p>
      <p>描述：这里可替换为用户上传的一句话记忆。</p>
    `;
  } else {
    modalContent.innerHTML = modalMap[type] || '<p>暂无内容</p>';
  }

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

app.addEventListener('click', (event) => {
  const target = event.target;
  const go = target.dataset.go;
  const goNode = target.dataset.goNode;
  const mapMode = target.dataset.mapMode;
  const modalType = target.dataset.modal;
  const aboutNode = target.dataset.about;

  if (go) {
    state.page = go;
    render();
    closeModal();
    return;
  }

  if (goNode) {
    state.page = 'node';
    state.currentNode = goNode;
    render();
    closeModal();
    return;
  }

  if (mapMode) {
    state.mapMode = mapMode;
    state.page = 'map';
    render();
    return;
  }

  if (modalType) {
    openModal(modalType);
    return;
  }

  if (aboutNode) {
    openModal('about', { node: aboutNode });
  }
});

modal.addEventListener('click', (event) => {
  if (event.target === modal || event.target.dataset.closeModal !== undefined) {
    closeModal();
  }
});

render();