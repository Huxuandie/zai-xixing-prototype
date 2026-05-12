const app = document.getElementById('app');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

const state = {
  page: 'cover',
  mapMode: 'today',
  currentNode: 'tailor',
};

const nodes = {
  tailor: {
    name: '裁缝铺',
    desc: '裁缝铺是西兴古镇日常生活中具有手工温度的空间。影像从布料、剪裁、缝纫动作和店铺环境出发，呈现传统手艺在古镇生活中的延续方式。用户进入该节点后，不只是观看一个职业场景，而是在手部动作、空间陈设与街坊关系之间，感受古镇日常经验如何被保存、改变并重新讲述。',
  },
  tofu: {
    name: '豆腐坊',
    desc: '豆腐坊呈现的是西兴古镇清晨生活中最具烟火气的一面。影像通过豆香、水汽、器具声和劳动动作，记录地方饮食与日常节奏之间的关系。用户在该节点中可以看到古镇生活并非只存在于历史叙述中，而是通过人的劳作、味觉记忆和重复性的日常实践继续发生。',
  },
  pavilion: {
    name: '庄亭（西施妆亭）',
    desc: '庄亭是西兴古镇连接现实空间与地方传说的重要节点。相传西施曾在此整装待渡，北上入吴，因此庄亭也被称为“西施妆亭”。在本作品中，庄亭既是可被拍摄和抵达的现实地点，也是历史想象、地方记忆与当代游览经验交汇的空间。用户通过该节点进入影像与资料弹窗，可以在“今日所见”与“昔日传说”之间建立联系。',
  },
  alley: {
    name: '街巷',
    desc: '街巷是连接西兴各个地点的流动空间，也是用户在作品中理解古镇整体结构的重要线索。影像以行走视角呈现巷道、门面、水岸与居民生活之间的关系，使古镇不再只是若干孤立景点，而成为一张由路径、停留和记忆共同构成的生活网络。用户在该节点中可以感受到空间移动本身也是一种叙事方式。',
  },
  museum: {
    name: '过塘行码头专项陈列馆',
    desc: '过塘行码头专项陈列馆承担着历史资料整理与地方记忆展示的功能。与其他生活化节点相比，陈列馆更像是作品中的档案入口，集中呈现西兴渡口、过塘行、码头交通与地方商业往来的历史信息。用户进入该节点后，可以通过影像、老照片、地图和展签资料，理解西兴古镇从交通节点到记忆空间的历史转变。',
  },
};

const videoSources = {
  tailor: './assets/videos/tailor_web.mp4',
  tofu: './assets/videos/tofu_web.mp4',
  alley: './assets/videos/street_web.mp4',
  museum: './assets/videos/museum_web.mp4',
  pavilion: './assets/videos/zhuangting_web.mp4',
};
const posterSources = {
  tailor: './assets/images/posters/poster_tailor.jpg',
  tofu: './assets/images/posters/poster_tofu.jpg',
  alley: './assets/images/posters/poster_alley.jpg',
  museum: './assets/images/posters/poster_museum.jpg',
  pavilion: './assets/images/posters/poster_pavilion.jpg',
};

const mapImages = {
  today: './assets/images/maps/map_today_xixing.png',
  history: './assets/images/maps/map_history_xixing.jpg',
};
const albumPhotos = [
  {
    title: '老街门面',
    image: './assets/images/album/album_old_street.jpg',
    time: '拍摄时间:2025年9月',
    location: '杭州西兴古镇老街',
    desc: '记录街边店铺与居民日常往来的生活痕迹。',
  },
  {
    title: '水岸记忆',
    image: './assets/images/album/album_waterfront.jpg',
    time: '拍摄时间:2025年9月',
    location: '杭州西兴古镇水岸',
    desc: '呈现水边空间与古镇生活之间的联系。',
  },
  {
    title: '街巷转角',
    image: './assets/images/album/album_alley.jpg',
    time: '拍摄时间:2025年9月',
    location: '杭州西兴古镇街巷',
    desc: '从行走视角观看西兴街巷的空间层次。',
  },
  {
    title: '庄亭旧影',
    image: './assets/images/album/album_pavilion.jpg',
    time: '拍摄时间:2025年9月',
    location: '庄亭（西施妆亭）附近',
    desc: '围绕庄亭及西施妆亭传说展开地方记忆。',
  },
  {
    title: '手艺现场',
    image: './assets/images/album/album_craft.jpg',
    time: '拍摄时间:2025年9月',
    location: '西兴古镇裁缝铺',
    desc: '呈现传统手艺在当代生活中的延续。',
  },
  {
    title: '清晨豆香',
    image: './assets/images/album/album_tofu.jpg',
    time: '拍摄时间:2025年9月',
    location: '西兴古镇豆腐坊',
    desc: '记录豆腐坊劳动节奏与地方味觉记忆。',
  },
  {
    title: '陈列馆一角',
    image: './assets/images/album/album_museum.jpg',
    time: '拍摄时间:2025年9月',
    location: '过塘行码头专项陈列馆',
    desc: '展示历史资料、展签与地方档案的观看现场。',
  },
  {
    title: '归途与桥',
    image: './assets/images/album/album_bridge.jpg',
    time: '拍摄时间:2025年9月',
    location: '杭州西兴古镇',
    desc: '以道路、桥与水岸收束古镇的空间经验。',
  },
];

function renderVideoBlock(nodeKey, label = '节点视频') {
  const src = videoSources[nodeKey];
  const poster = posterSources[nodeKey];

  return `
    <div class="video-block">
      <video controls preload="metadata" playsinline class="node-video" poster="${poster}">
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
        <div class="cover-actions">
          <button class="btn" data-go="map">进入地图</button>
          <button class="btn" data-modal="aboutWork">关于作品</button>
        </div>
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
                : `<img class="today-map-image history-map-image" src="${mapImages.history}" alt="昔日西兴地图" />`
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
      ${renderVideoBlock('tailor', '裁缝铺影像：传统手艺与街坊日常')}
      <p>${node.desc}</p>
    `;
  } else if (nodeKey === 'tofu') {
    nodeMainContent = `
      ${renderVideoBlock('tofu', '豆腐坊影像：清晨劳动与地方味觉记忆')}
      <p>${node.desc}</p>
    `;
  } else if (nodeKey === 'alley') {
    nodeMainContent = `
      ${renderVideoBlock('alley', '街巷影像：行走中的古镇空间')}
      <p>${node.desc}</p>
    `;
  } else if (nodeKey === 'pavilion') {
    nodeMainContent = `
      ${renderVideoBlock('pavilion', '庄亭影像：现实地点与地方传说')}
      <p>${node.desc}</p>
    `;
  } else if (nodeKey === 'museum') {
    nodeMainContent = `
      <div class="collection-layout">
        <div>
          ${renderVideoBlock('museum', '陈列馆影像：档案、展陈与地方历史')}
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
  const items = albumPhotos
    .map(
      (item, index) => `
        <button class="photo-item" data-modal="photo${index + 1}">
          <img src="${item.image}" alt="${item.title}" class="photo-thumb" />
          <span>${item.title}</span>
        </button>
      `
    )
    .join('');

  return `
    <section class="page">
      <button class="btn" data-go="map">← 返回地图</button>
      <h2>相册里的西兴</h2>
      <p>这里预置部分实地拍摄照片，作为公众记忆征集模块的基础展示与视觉参考。点击任意图片查看详情。</p>
      <div class="photo-grid">${items}</div>
      <div style="margin-top:16px;">
        <button class="btn" data-go="form">分享我的西兴记忆</button>
        <button class="btn" data-go="ending">查看结语</button>
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
        <h2>结语</h2>
        <p>潮声缓慢，旧桥与新路共同延伸。你已完成一段关于西兴的地图式观看，也在影像、资料与个人记忆之间重新认识这座仍在生活中的古镇。</p>
        <button class="btn" data-go="map">返回地图</button>
        <button class="btn" data-go="cover">重新进入</button>
      </div>
    </section>
  `;
}

function openModal(type, context = {}) {
  const modalMap = {
    aboutWork: `
      <h3>关于《在西兴》</h3>
      <p>《在西兴》是一部以杭州西兴古镇为对象的地图式交互纪录片网页原型。作品以“今日西兴”和“昔日西兴”两个空间层为基础，将裁缝铺、豆腐坊、庄亭、街巷、过塘行码头专项陈列馆等地点组织为可点击的叙事节点。</p>
      <p>用户通过自主选择路径进入不同影像片段、历史资料与个人相册内容，在非线性浏览中建立对西兴古镇的空间记忆与地方认知。</p>
      <p><strong>交互方式：</strong>点击地图热点进入节点页面，观看影像，并通过历史资料、今昔对照和相册模块补充对地点的理解。</p>
      <p><strong>创作说明：</strong>本作品为毕业设计网页原型，重点展示地图式叙事结构、节点影像组织方式与公众记忆参与机制。</p>
      <div>
        <button class="btn" data-close-modal>关闭</button>
      </div>
    `,

    about: `
      <h3>关于此点：${nodes[context.node]?.name || ''}</h3>
      ...
    `,

    xishiLegend: `
      <h3>庄亭 / 西施妆亭</h3>
      <div class="compare">
        <div>
          <div class="img-ph">今日庄亭影像</div>
          <p>现实层：庄亭临水而立，是当下影像的停留点，也连接着用户对西兴水岸空间的直接观看。</p>
        </div>
        <div>
          <div class="img-ph">西施妆亭传说</div>
          <p>历史层：相传西施在此整装待渡，北上入吴，这一传说为现实地点叠加了地方记忆与历史想象。</p>
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
        <div class="img-ph">今日空间影像</div>
        <div class="img-ph">昔日资料线索</div>
      </div>
      <p>通过空间轮廓、渡口位置与街巷走向，对比古镇肌理变化，使用户在当下影像与历史资料之间建立观看联系。</p>
    `,

    oldMap: `
      <h3>老地图资料</h3>
      <img src="./assets/images/maps/map_history_xixing.jpg" alt="西兴古镇历史地图" class="modal-photo" />
      <p>这张地图作为“昔日西兴”的历史空间资料，用于呈现西兴古镇中渡口、水岸、街巷与主要地点之间的关系，帮助用户从历史层面理解今日西兴的空间结构。</p>
    `,

    oldPhotos: `
      <h3>历史照片</h3>
      <div class="img-ph">旧影像资料展示</div>
      <p>历史照片用于补充同一地点在不同时期的视觉线索，使用户在观看今日影像时意识到空间记忆的延续与变化。</p>
    `,

    gazetteer: `
      <h3>地方志资料</h3>
      <p>地方志资料用于补充西兴渡口、街巷、手工业与地方商业往来的背景信息，为节点影像提供更完整的历史语境。</p>
    `,

    labels: `
      <h3>展签资料</h3>
      <p>展签文字集中呈现陈列馆对西兴过塘行、码头交通和地方商贸历史的解释，是用户理解档案内容的重要入口。</p>
    `,

    catalog: `
      <h3>图录资料</h3>
      <p>图录资料以图片和文字的方式整理陈列馆中的历史材料，辅助用户把单个展品放回西兴古镇的整体历史脉络中理解。</p>
    `,

    submitInfo: `
      <h3>提交说明</h3>
      <p>本页面为毕业设计原型展示，暂不真正上传文件。相册模块用于模拟公众参与和地方记忆征集的交互流程。</p>
    `,
  };

  if (type.startsWith('photo')) {
  const photoIndex = Number(type.replace('photo', '')) - 1;
  const photo = albumPhotos[photoIndex] || {
    title: '西兴记忆',
    image: '',
    time: '拍摄时间：由提交者填写',
    location: '杭州西兴古镇',
    desc: '这里记录一段与西兴有关的个人记忆。',
  };

  modalContent.innerHTML = `
    <h3>照片详情：${photo.title}</h3>
    <img src="${photo.image}" alt="${photo.title}" class="modal-photo" />
    <p>${photo.time}</p>
    <p>地点：${photo.location}</p>
    <p>描述：${photo.desc}</p>
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