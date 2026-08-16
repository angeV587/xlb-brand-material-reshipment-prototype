import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Clock3,
  Edit3,
  Eye,
  FileImage,
  Filter,
  Grid2X2,
  Home,
  Info,
  ListFilter,
  MapPin,
  Minus,
  PackageCheck,
  PackagePlus,
  Plus,
  RefreshCcw,
  RotateCcw,
  Search,
  Send,
  ShoppingCart,
  Store,
  Trash2,
  Truck,
  Upload,
  UserRound,
  Workflow,
  X,
} from 'lucide-react';
import './application-flows.css';

const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const PRODUCTS = [
  { id: 'card', code: 'SP-202608-001', name: '会员权益卡（新版）', spec: '100 张 / 包', image: asset('product-member-card.png'), multiple: 1, min: 1, max: 2 },
  { id: 'stand', code: 'SP-202608-016', name: '会员活动立牌', spec: 'A4 / 亚克力', image: asset('product-acrylic-stand.png'), multiple: 1, min: 1, max: 4 },
  { id: 'poster', code: 'SP-202608-021', name: '会员活动海报', spec: 'A3 / 20 张', image: asset('product-poster.png'), multiple: 2, min: 2, max: 6 },
];

const SEED_APPLICATIONS = [
  { id: 'BF202608150026', store: '星河路店', org: '华东事业部', reason: '物料破损补发', date: '2026-08-18', status: '审批中', approvalStatus: '审批中', orderStatus: '未生成', fulfillmentStatus: '未开始', items: 2, qty: 3, applicant: '王小安', created: '2026-08-15 14:20', orderNo: '—', note: '会员活动立牌运输中破损' },
  { id: 'BF202608140019', store: '南京中山路店', org: '华东事业部', reason: '新店开业补发', date: '2026-08-17', status: '已驳回', approvalStatus: '已驳回', orderStatus: '未生成', fulfillmentStatus: '未开始', items: 1, qty: 2, applicant: '李木子', created: '2026-08-14 10:12', orderNo: '—', note: '请补充破损图片后重新提交' },
  { id: 'BF202608130011', store: '星河路店', org: '华东事业部', reason: '物料破损补发', date: '2026-08-16', status: '待出单', approvalStatus: '已通过', orderStatus: '生成中', fulfillmentStatus: '未开始', items: 3, qty: 4, applicant: '王小安', created: '2026-08-13 16:42', orderNo: '—', note: '泛微审批已通过，等待最新规则校验' },
  { id: 'BF202608100008', store: '苏州园区店', org: '华东事业部', reason: '版本换新补发', date: '2026-08-13', status: '配送中', approvalStatus: '已通过', orderStatus: '已生成', fulfillmentStatus: '配送中', items: 2, qty: 3, applicant: '周雨', created: '2026-08-10 09:31', orderNo: 'DD1001010000216', note: '仓库已出库' },
  { id: 'BF202608060003', store: '杭州湖滨店', org: '华东事业部', reason: '物料破损补发', date: '2026-08-09', status: '已完成', approvalStatus: '已通过', orderStatus: '已生成', fulfillmentStatus: '已送达', items: 1, qty: 1, applicant: '陈晨', created: '2026-08-06 11:06', orderNo: 'DD1001010000203', note: '门店已签收' },
  { id: 'BF202608160001', store: '星河路店', org: '华东事业部', reason: '物料破损补发', date: '2026-08-19', status: '草稿', approvalStatus: '草稿', orderStatus: '未生成', fulfillmentStatus: '未开始', items: 1, qty: 1, applicant: '王小安', created: '2026-08-16 08:46', orderNo: '—', note: '待补充凭证' },
];

const MOBILE_TABS = ['全部', '审批中', '已驳回', '待出单', '配送中', '已完成'];
const STATUS_TONE = {
  草稿: 'draft',
  审批中: 'review',
  已驳回: 'rejected',
  待出单: 'pending',
  配送中: 'shipping',
  已完成: 'done',
};

function StatusBadge({ status }) {
  return <span className={`af-status ${STATUS_TONE[status] || 'draft'}`}>{status}</span>;
}

function Quantity({ value, min, max, onChange }) {
  return (
    <div className="af-quantity">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label="减少数量"><Minus size={14} /></button>
      <b>{value}</b>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} aria-label="增加数量"><Plus size={14} /></button>
    </div>
  );
}

function MobileList({ applications, onCreate, onOpen }) {
  const [tab, setTab] = useState('全部');
  const [keyword, setKeyword] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [reason, setReason] = useState('全部原因');
  const filtered = useMemo(() => applications.filter((item) => {
    const matchesTab = tab === '全部' || item.status === tab;
    const matchesKeyword = !keyword.trim() || `${item.id} ${item.store} ${item.reason}`.toLowerCase().includes(keyword.trim().toLowerCase());
    const matchesReason = reason === '全部原因' || item.reason === reason;
    return matchesTab && matchesKeyword && matchesReason;
  }), [applications, keyword, reason, tab]);

  return (
    <main className="af-mobile-shell af-mobile-list">
      <header className="af-mobile-header"><span aria-hidden="true" /><h1>品牌物料补发</h1><button type="button" aria-label="筛选" className={filterOpen ? 'active' : ''} onClick={() => setFilterOpen((v) => !v)}><ListFilter size={21} /></button></header>
      <section className="af-mobile-search"><Search size={17} /><input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="搜索申请单号、门店或原因" />{keyword && <button type="button" onClick={() => setKeyword('')}><X size={16} /></button>}</section>
      <nav className="af-mobile-tabs" aria-label="申请状态">{MOBILE_TABS.map((item) => <button type="button" key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</nav>
      {filterOpen && <section className="af-mobile-filter"><span>补发原因</span><div>{['全部原因', '物料破损补发', '新店开业补发', '版本换新补发'].map((item) => <button type="button" key={item} className={reason === item ? 'active' : ''} onClick={() => setReason(item)}>{item}</button>)}</div></section>}
      <section className="af-mobile-results">
        <div className="af-result-summary"><span>共 {filtered.length} 条申请</span><button type="button"><RefreshCcw size={14} />刷新</button></div>
        {filtered.length === 0 && <div className="af-mobile-empty"><ClipboardList size={34} /><b>暂无符合条件的申请</b><p>切换状态或清空筛选条件后重试</p></div>}
        {filtered.map((item) => (
          <article className="af-application-card" key={item.id} onClick={() => onOpen(item)}>
            <div className="af-card-head"><b>{item.reason}</b><StatusBadge status={item.status} /></div>
            <p className="af-application-no">{item.id}<ChevronRight size={16} /></p>
            <div className="af-card-grid"><span><Store size={15} />{item.store}</span><span><CalendarDays size={15} />预计配送 {item.date}</span><span><Boxes size={15} />{item.items} 项 / {item.qty} 件</span><span><Clock3 size={15} />{item.created.slice(5, 16)}</span></div>
            <div className="af-card-states"><span>审批 <b>{item.approvalStatus}</b></span><span>出单 <b>{item.orderStatus}</b></span><span>履约 <b>{item.fulfillmentStatus}</b></span></div>
            <footer><span>{item.status === '已驳回' ? item.note : item.orderNo !== '—' ? `门店订单 ${item.orderNo}` : '提交后统一进入泛微审批'}</span>{['草稿', '已驳回'].includes(item.status) && <button type="button" onClick={(e) => { e.stopPropagation(); onOpen(item, true); }}><Edit3 size={14} />编辑</button>}</footer>
          </article>
        ))}
      </section>
      <button className="af-mobile-create" type="button" onClick={onCreate}><Plus size={20} />申请补发</button>
      <nav className="af-bottom-nav"><button type="button"><Home size={20} /><span>首页</span></button><button type="button"><ShoppingCart size={20} /><span>订货</span></button><button className="active" type="button"><ClipboardList size={20} /><span>单据</span></button><button type="button"><UserRound size={20} /><span>我的</span></button></nav>
    </main>
  );
}

function MobileForm({ initial, onBack, onSave, onSubmit }) {
  const [reason, setReason] = useState(initial?.reason || '物料破损补发');
  const [date, setDate] = useState(initial?.date || '2026-08-19');
  const [note, setNote] = useState(initial?.status === '已驳回' ? '' : initial?.note || '');
  const [items, setItems] = useState([{ ...PRODUCTS[0], qty: 1, proof: Boolean(initial && initial.status !== '草稿') }]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const isEditing = Boolean(initial);
  const total = items.reduce((sum, item) => sum + item.qty, 0);
  const updateItem = (id, patch) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const validate = () => {
    if (!items.length) return '请至少选择一项补发物料';
    if (items.some((item) => !item.proof)) return '请为每项物料上传凭证图片';
    if (items.some((item) => item.qty % item.multiple !== 0)) return '申请数量需符合订购倍数';
    return '';
  };
  const submit = () => {
    const error = validate();
    if (error) return setMessage(error);
    setMessage('');
    onSubmit({ ...initial, reason, date, note, items: items.length, qty: total });
  };
  return (
    <main className="af-mobile-shell af-mobile-form">
      <header className="af-mobile-header"><button type="button" onClick={onBack}><ArrowLeft size={22} /></button><h1>{isEditing ? '编辑补发申请' : '新增补发申请'}</h1><span /></header>
      <div className="af-mobile-form-scroll">
        {initial?.status === '已驳回' && <section className="af-rejected-tip"><AlertTriangle size={17} /><div><b>泛微审批已驳回</b><p>{initial.note}</p></div></section>}
        <section className="af-mobile-section"><h2>申请信息</h2>
          <label><span>申请门店 <i>*</i></span><button type="button">华东事业部 · 星河路店<ChevronRight size={16} /></button></label>
          <label><span>补发原因 <i>*</i></span><select value={reason} onChange={(e) => setReason(e.target.value)}><option>物料破损补发</option><option>新店开业补发</option><option>版本换新补发</option></select></label>
          <label><span>预计配送日 <i>*</i></span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
          <label className="af-mobile-note"><span>申请说明</span><textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="请补充物料损坏或缺失情况" maxLength={200} /></label>
        </section>
        <section className="af-mobile-section af-mobile-products"><div className="af-section-heading"><h2>补发商品 <i>*</i></h2><span>{items.length} 项 / {total} 件</span></div>
          <div className="af-rule-note"><Info size={16} /><p>商品范围取“补发配置”与门店可订范围交集；提交时校验停止要货、停售、停购、配送日、订购倍数及上下限。</p></div>
          {items.map((item) => <article key={item.id} className="af-mobile-product"><img src={item.image} alt="" /><div className="af-mobile-product-main"><div><b>{item.name}</b><button type="button" onClick={() => setItems((list) => list.filter((p) => p.id !== item.id))}><Trash2 size={15} /></button></div><p>{item.code} · {item.spec}</p><div className="af-product-line"><span>申请数量</span><Quantity value={item.qty} min={item.min} max={item.max} onChange={(qty) => updateItem(item.id, { qty })} /></div><div className="af-product-line"><span>图片凭证</span><button type="button" className={item.proof ? 'af-proof-ready' : 'af-proof-upload'} onClick={() => updateItem(item.id, { proof: !item.proof })}>{item.proof ? <><FileImage size={15} />凭证已上传<Check size={15} /></> : <><Upload size={15} />上传图片</>}</button></div><small>订购倍数 {item.multiple}，可订范围 {item.min}–{item.max} 件</small></div></article>)}
          <button type="button" className="af-add-product" onClick={() => setPickerOpen(true)}><Plus size={17} />添加补发商品</button>
        </section>
        <section className="af-double-check"><Workflow size={19} /><div><b>统一提交泛微审批</b><p>泛微按“二级组织 + 补发原因”分支；无人工审批需要时由泛微节点自动通过。审批通过出单前再次校验门店订单规则，异常不静默改量。</p></div></section>
      </div>
      {message && <div className="af-mobile-toast">{message}</div>}
      <footer className="af-mobile-actions"><button type="button" onClick={() => onSave({ ...initial, reason, date, note, items: items.length, qty: total })}>保存草稿</button><button type="button" onClick={submit}><Send size={16} />提交审批</button></footer>
      {pickerOpen && <div className="af-mobile-mask"><section className="af-mobile-picker"><div className="af-picker-handle" /><header><h2>选择补发商品</h2><button type="button" onClick={() => setPickerOpen(false)}><X size={20} /></button></header><div className="af-picker-search"><Search size={16} /><input placeholder="搜索商品编码 / 名称" /></div><p className="af-picker-scope">已按“{reason}”与门店可订范围过滤</p>{PRODUCTS.map((item) => { const selected = items.some((p) => p.id === item.id); return <button type="button" className="af-picker-product" key={item.id} onClick={() => setItems((list) => selected ? list.filter((p) => p.id !== item.id) : [...list, { ...item, qty: item.min, proof: false }])}><img src={item.image} alt="" /><span><b>{item.name}</b><small>{item.code} · {item.spec}</small></span><i className={selected ? 'selected' : ''}>{selected && <Check size={15} />}</i></button>; })}<footer><span>已选 {items.length} 项</span><button type="button" onClick={() => setPickerOpen(false)}>完成</button></footer></section></div>}
    </main>
  );
}

function MobileDetail({ item, onBack, onEdit }) {
  return <main className="af-mobile-shell af-mobile-detail"><header className="af-mobile-header"><button type="button" onClick={onBack}><ArrowLeft size={22} /></button><h1>补发申请详情</h1><span /></header><section className="af-detail-status"><StatusBadge status={item.status} /><h2>{item.reason}</h2><p>{item.id}</p></section><section className="af-mobile-section af-detail-grid"><h2>申请信息</h2><p><span>申请门店</span><b>{item.org} · {item.store}</b></p><p><span>预计配送日</span><b>{item.date}</b></p><p><span>补发商品</span><b>{item.items} 项 / {item.qty} 件</b></p><p><span>申请人</span><b>{item.applicant}</b></p><p><span>申请时间</span><b>{item.created}</b></p><p><span>关联订单</span><b>{item.orderNo}</b></p></section><section className="af-mobile-section"><h2>处理进度</h2><div className="af-mobile-timeline"><div className="done"><i><Check size={13} /></i><span><b>提交泛微审批</b><small>{item.created}</small></span></div><div className={['待出单', '配送中', '已完成'].includes(item.status) ? 'done' : ''}><i>{['待出单', '配送中', '已完成'].includes(item.status) && <Check size={13} />}</i><span><b>泛微审批完成</b><small>{item.status === '已驳回' ? item.note : '按二级组织与原因匹配流程分支'}</small></span></div><div className={['配送中', '已完成'].includes(item.status) ? 'done' : ''}><i>{['配送中', '已完成'].includes(item.status) && <Check size={13} />}</i><span><b>门店订单生成</b><small>出单前再次执行订购规则校验</small></span></div></div></section>{['草稿', '已驳回'].includes(item.status) && <footer className="af-mobile-actions single"><button type="button" onClick={() => onEdit(item)}><Edit3 size={16} />编辑并重新提交</button></footer>}</main>;
}

export function MobileApplicationFlow() {
  const [page, setPage] = useState('list');
  const [applications, setApplications] = useState(SEED_APPLICATIONS);
  const [current, setCurrent] = useState(null);
  const open = (item, edit = false) => { setCurrent(item); setPage(edit || ['草稿', '已驳回'].includes(item.status) ? 'form' : 'detail'); };
  const save = (draft) => { const id = draft?.id || `BF20260816${String(applications.length + 2).padStart(4, '0')}`; setApplications((list) => [{ ...draft, id, store: '星河路店', org: '华东事业部', status: '草稿', approvalStatus: '草稿', orderStatus: '未生成', fulfillmentStatus: '未开始', applicant: '王小安', created: '2026-08-16 10:20', orderNo: '—' }, ...list.filter((item) => item.id !== id)]); setPage('list'); };
  const submit = (draft) => { const id = draft?.id || `BF20260816${String(applications.length + 2).padStart(4, '0')}`; const result = { ...draft, id, store: '星河路店', org: '华东事业部', status: '审批中', approvalStatus: '审批中', orderStatus: '未生成', fulfillmentStatus: '未开始', applicant: '王小安', created: '2026-08-16 10:20', orderNo: '—' }; setApplications((list) => [result, ...list.filter((item) => item.id !== id)]); setCurrent(result); setPage('detail'); };
  if (page === 'form') return <MobileForm initial={current} onBack={() => setPage('list')} onSave={save} onSubmit={submit} />;
  if (page === 'detail') return <MobileDetail item={current} onBack={() => setPage('list')} onEdit={(item) => { setCurrent(item); setPage('form'); }} />;
  return <MobileList applications={applications} onCreate={() => { setCurrent(null); setPage('form'); }} onOpen={open} />;
}

function PcFrame({ children, activeTab, onTab, formTitle }) {
  return <main className="paf-app"><header className="paf-topbar"><b>新零帮</b><button type="button"><Grid2X2 size={17} />应用</button><div><Search size={17} />搜索菜单、单据、商品</div><span /><em>南京众承 · 管理中心</em><i>王小安</i></header><div className="paf-workspace"><aside><strong>ERP连锁管理</strong><button type="button"><ClipboardList size={18} />看板</button><button type="button" className="active"><Truck size={18} />配送<ChevronRight size={15} /></button><section><span>业务操作</span><b>品牌物料补发</b><button type="button" onClick={() => { window.location.search = '?view=pc'; }}>业务设置 · 补发配置</button><span>配送参数</span><span>门店订单</span></section><button type="button"><Boxes size={18} />采购</button></aside><section className="paf-main"><nav className="paf-tabs"><button type="button">SCM看板</button><button type="button">门店订单</button><button type="button" className={activeTab === 'list' ? 'active' : ''} onClick={() => onTab('list')}>品牌物料补发申请</button>{activeTab === 'form' && <button type="button" className="active">{formTitle}<X size={14} onClick={() => onTab('list')} /></button>}</nav>{children}</section></div></main>;
}

function PcApplicationList({ applications, setApplications, onCreate, onEdit, onView }) {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('全部状态');
  const [reason, setReason] = useState('全部原因');
  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState('');
  const filtered = applications.filter((item) => (!keyword || `${item.id} ${item.store}`.includes(keyword)) && (status === '全部状态' || item.status === status) && (reason === '全部原因' || item.reason === reason));
  const selectedItem = applications.find((item) => selected.includes(item.id));
  const notify = (text) => { setToast(text); window.setTimeout(() => setToast(''), 1800); };
  const withdraw = () => { if (!selectedItem || selectedItem.status !== '审批中') return; setApplications((list) => list.map((item) => item.id === selectedItem.id ? { ...item, status: '草稿', approvalStatus: '草稿', note: '已从泛微撤回' } : item)); setSelected([]); notify('申请已从泛微审批撤回并转为草稿'); };
  return <div className="paf-content"><header className="paf-title"><div><p>配送 / 业务操作</p><h1>品牌物料补发申请</h1></div><span><Workflow size={17} />所有申请统一提交泛微审批</span></header><section className="paf-filters"><label><span>申请单号</span><input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="请输入申请单号" /></label><label><span>申请门店</span><button type="button">请选择门店<Search size={15} /></button></label><label><span>补发原因</span><select value={reason} onChange={(e) => setReason(e.target.value)}><option>全部原因</option><option>物料破损补发</option><option>新店开业补发</option><option>版本换新补发</option></select></label><label><span>申请状态</span><select value={status} onChange={(e) => setStatus(e.target.value)}><option>全部状态</option><option>草稿</option><option>审批中</option><option>已驳回</option><option>待出单</option><option>配送中</option><option>已完成</option></select></label><label><span>申请日期</span><div className="paf-range"><input type="date" /><i>至</i><input type="date" /></div></label><footer><button type="button" className="primary"><Search size={15} />查询</button><button type="button" onClick={() => { setKeyword(''); setStatus('全部状态'); setReason('全部原因'); }}><RotateCcw size={15} />重置</button></footer></section><section className="paf-toolbar"><button type="button" className="primary" onClick={onCreate}><Plus size={16} />新增</button><button type="button" disabled={!selectedItem || !['草稿', '已驳回'].includes(selectedItem.status)} onClick={() => onEdit(selectedItem)}><Edit3 size={15} />修改</button><button type="button" disabled={!selectedItem || selectedItem.status !== '审批中'} onClick={withdraw}><RotateCcw size={15} />撤回</button><button type="button" disabled={!selectedItem} onClick={() => onView(selectedItem)}><Eye size={15} />查看</button><span>共 {filtered.length} 条</span></section><div className="paf-table-wrap"><table><thead><tr><th><input type="checkbox" checked={filtered.length > 0 && filtered.every((item) => selected.includes(item.id))} onChange={(e) => setSelected(e.target.checked ? filtered.map((item) => item.id) : [])} /></th><th>申请单号</th><th>申请门店</th><th>所属组织</th><th>补发原因</th><th>预计配送日</th><th>商品/数量</th><th>申请状态</th><th>关联门店订单</th><th>申请人 / 申请时间</th><th>操作</th></tr></thead><tbody>{filtered.map((item) => <tr className={selected.includes(item.id) ? 'selected' : ''} key={item.id}><td><input type="checkbox" checked={selected.includes(item.id)} onChange={() => setSelected((list) => list.includes(item.id) ? list.filter((id) => id !== item.id) : [...list, item.id])} /></td><td><button type="button" className="link" onClick={() => onView(item)}>{item.id}</button></td><td>{item.store}</td><td>{item.org}</td><td>{item.reason}</td><td>{item.date}</td><td>{item.items} 项 / {item.qty} 件</td><td><StatusBadge status={item.status} /></td><td>{item.orderNo === '—' ? '—' : <button type="button" className="link">{item.orderNo}</button>}</td><td>{item.applicant}<small>{item.created}</small></td><td>{['草稿', '已驳回'].includes(item.status) ? <button type="button" className="link" onClick={() => onEdit(item)}>编辑</button> : <button type="button" className="link" onClick={() => onView(item)}>查看</button>}</td></tr>)}</tbody></table></div><div className="paf-pagination"><span>共 {filtered.length} 条</span><button type="button">1</button><span>200 条/页</span></div>{toast && <div className="paf-toast"><CheckCircle2 size={17} />{toast}</div>}</div>;
}

function PcApplicationForm({ initial, readonly = false, onBack, onSave, onSubmit }) {
  const [store, setStore] = useState(initial?.store || '星河路店');
  const [reason, setReason] = useState(initial?.reason || '物料破损补发');
  const [date, setDate] = useState(initial?.date || '2026-08-19');
  const [note, setNote] = useState(initial?.note || '');
  const [items, setItems] = useState([{ ...PRODUCTS[0], qty: 1, proof: true }, { ...PRODUCTS[1], qty: 1, proof: false }]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const title = readonly ? '查看补发申请' : initial ? '编辑补发申请' : '新增补发申请';
  const total = items.reduce((sum, item) => sum + item.qty, 0);
  const submit = () => { if (items.some((item) => !item.proof)) return setMessage('存在未上传图片凭证的商品，请补充后再提交。'); if (items.some((item) => item.qty % item.multiple !== 0)) return setMessage('商品数量不符合订购倍数，请调整后再提交。'); onSubmit({ ...initial, store, org: '华东事业部', reason, date, note, items: items.length, qty: total }); };
  return <div className="paf-content paf-form-page" editing={String(Boolean(initial))}><header className="paf-title"><div><p>配送 / 品牌物料补发申请 / {title}</p><h1>{title}</h1></div><button type="button" onClick={onBack}><ArrowLeft size={15} />返回列表</button></header>{initial?.status === '已驳回' && <div className="paf-reject-banner"><AlertTriangle size={17} /><b>泛微审批驳回：</b>{initial.note}</div>}<section className="paf-form-card"><h2>申请信息</h2><div className="paf-form-grid"><label><span>申请门店 <i>*</i></span><select disabled={readonly} value={store} onChange={(e) => setStore(e.target.value)}><option>星河路店</option><option>南京中山路店</option><option>苏州园区店</option></select></label><label><span>所属二级组织</span><input disabled value="华东事业部" /></label><label><span>补发原因 <i>*</i></span><select disabled={readonly} value={reason} onChange={(e) => setReason(e.target.value)}><option>物料破损补发</option><option>新店开业补发</option><option>版本换新补发</option></select></label><label><span>预计配送日 <i>*</i></span><input disabled={readonly} type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label><label className="wide"><span>申请说明</span><textarea disabled={readonly} value={note} onChange={(e) => setNote(e.target.value)} placeholder="请说明物料损坏、缺失或换新情况" /></label></div></section><section className="paf-form-card"><div className="paf-card-title"><div><h2>补发商品明细 <i>*</i></h2><p>商品范围取“补发配置”与当前门店可订商品范围的交集</p></div>{!readonly && <button type="button" className="primary" onClick={() => setPickerOpen(true)}><Plus size={15} />添加商品</button>}</div><div className="paf-rules"><Info size={16} /><span>提交审批时校验停止要货、停售、停购、配送日、订购倍数、订购上下限及实际发货仓。泛微审批通过出单前再次校验；异常进入待处理，不静默改量。</span></div><div className="paf-form-table"><table><thead><tr><th>商品图片</th><th>商品编码</th><th>商品名称</th><th>规格</th><th>订购属性</th><th>申请数量</th><th>图片凭证</th>{!readonly && <th>操作</th>}</tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><img src={item.image} alt="" /></td><td>{item.code}</td><td>{item.name}</td><td>{item.spec}</td><td>倍数 {item.multiple} / {item.min}–{item.max} 件</td><td>{readonly ? item.qty : <Quantity value={item.qty} min={item.min} max={item.max} onChange={(qty) => setItems((list) => list.map((p) => p.id === item.id ? { ...p, qty } : p))} />}</td><td>{item.proof ? <button type="button" className="paf-proof" disabled={readonly} onClick={() => setItems((list) => list.map((p) => p.id === item.id ? { ...p, proof: false } : p))}><FileImage size={15} />查看凭证<CheckCircle2 size={15} /></button> : <button type="button" className="paf-upload" disabled={readonly} onClick={() => setItems((list) => list.map((p) => p.id === item.id ? { ...p, proof: true } : p))}><Upload size={15} />上传图片</button>}</td>{!readonly && <td><button type="button" className="link danger" onClick={() => setItems((list) => list.filter((p) => p.id !== item.id))}>移除</button></td>}</tr>)}</tbody></table></div><footer className="paf-form-summary"><span>共 {items.length} 项，申请 {total} 件</span></footer></section><section className="paf-bpm-note"><Workflow size={20} /><div><b>审批流由泛微统一承接</b><p>ERP提交申请后，泛微按“申请门店所属二级组织 + 补发原因”进入对应流程分支；无需人工审批时，由泛微配置自动通过节点。</p></div></section>{message && <div className="paf-form-error"><AlertTriangle size={16} />{message}</div>}<footer className="paf-page-actions"><button type="button" onClick={onBack}>取消</button>{!readonly && <><button type="button" onClick={() => onSave({ ...initial, store, org: '华东事业部', reason, date, note, items: items.length, qty: total })}>保存草稿</button><button type="button" className="primary" onClick={submit}><Send size={15} />提交泛微审批</button></>}</footer>{pickerOpen && <div className="paf-modal-mask"><section className="paf-product-modal"><header><div><h2>选择商品</h2><p>展示当前用户权限可见商品，保存时进入补发配置与门店订购规则校验</p></div><button type="button" onClick={() => setPickerOpen(false)}><X size={20} /></button></header><div className="paf-modal-search"><label>商品编码/名称<input placeholder="请输入商品编码、名称或条码" /></label><label>商品分类<select><option>全部分类</option><option>品牌物料</option></select></label><button type="button" className="primary"><Search size={15} />查询</button></div><div className="paf-picker-table"><table><thead><tr><th>选择</th><th>商品图片</th><th>商品编码</th><th>商品名称</th><th>规格</th><th>订购属性</th></tr></thead><tbody>{PRODUCTS.map((item) => { const selected = items.some((p) => p.id === item.id); return <tr key={item.id} className={selected ? 'selected' : ''} onClick={() => setItems((list) => selected ? list.filter((p) => p.id !== item.id) : [...list, { ...item, qty: item.min, proof: false }])}><td><input type="checkbox" readOnly checked={selected} /></td><td><img src={item.image} alt="" /></td><td>{item.code}</td><td>{item.name}</td><td>{item.spec}</td><td>倍数 {item.multiple} / {item.min}–{item.max}</td></tr>; })}</tbody></table></div><footer><span>已选 {items.length} 项</span><button type="button" onClick={() => setPickerOpen(false)}>取消</button><button type="button" className="primary" onClick={() => setPickerOpen(false)}>确认</button></footer></section></div>}</div>;
}

export function PcApplicationModule() {
  const [tab, setTab] = useState('list');
  const [mode, setMode] = useState('edit');
  const [current, setCurrent] = useState(null);
  const [applications, setApplications] = useState(SEED_APPLICATIONS);
  const openForm = (item = null, nextMode = 'edit') => { setCurrent(item); setMode(nextMode); setTab('form'); };
  const save = (draft, status) => { const id = draft?.id || `BF20260816${String(applications.length + 2).padStart(4, '0')}`; const row = { ...draft, id, status, approvalStatus: status, orderStatus: '未生成', fulfillmentStatus: '未开始', applicant: '王小安', created: '2026-08-16 10:20', orderNo: '—' }; setApplications((list) => [row, ...list.filter((item) => item.id !== id)]); setTab('list'); };
  const formTitle = mode === 'view' ? '查看补发申请' : current ? '编辑补发申请' : '新增补发申请';
  return <PcFrame activeTab={tab} onTab={setTab} formTitle={formTitle}>{tab === 'list' ? <PcApplicationList applications={applications} setApplications={setApplications} onCreate={() => openForm()} onEdit={(item) => openForm(item)} onView={(item) => openForm(item, 'view')} /> : <PcApplicationForm initial={current} readonly={mode === 'view'} onBack={() => setTab('list')} onSave={(draft) => save(draft, '草稿')} onSubmit={(draft) => save(draft, '审批中')} />}</PcFrame>;
}
