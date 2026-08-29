import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Edit3,
  FileImage,
  Filter,
  Grid2X2,
  Home,
  Info,
  ListFilter,
  Minus,
  PackageCheck,
  PackagePlus,
  Plus,
  RotateCcw,
  Search,
  ScanLine,
  ShoppingCart,
  Trash2,
  Truck,
  Upload,
  UserRound,
  X,
} from 'lucide-react';
import './application-flows.css';

const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const PRODUCTS = [
  { id: 'card', code: 'SP-202608-001', name: '会员权益卡（新版）', spec: '100 张 / 包', image: asset('product-member-card.png'), multiple: 1, min: 1, max: 2 },
  { id: 'stand', code: 'SP-202608-016', name: '会员活动立牌', spec: 'A4 / 亚克力', image: asset('product-acrylic-stand.png'), multiple: 1, min: 1, max: 4 },
  { id: 'poster', code: 'SP-202608-021', name: '会员活动海报', spec: 'A3 / 20 张', image: asset('product-poster.png'), multiple: 2, min: 2, max: 6 },
];

const makeProductLines = (lines) => lines.map(([id, qty, proof = true]) => ({
  ...PRODUCTS.find((product) => product.id === id),
  qty,
  proof,
}));

const SEED_APPLICATIONS = [
{ id: 'BF202608150026', store: '星河路店', org: '华东事业部', reason: '物料破损补发', date: '2026-08-18', status: '审核', approvalStatus: '审批中', items: 2, qty: 3, applicant: '王小安', created: '2026-08-15 14:20', auditor: '—', auditedAt: '—', orderNo: '—', note: '会员活动立牌运输中破损', rejectReason: '', productLines: makeProductLines([['card', 2], ['stand', 1]]), productNames: '会员权益卡（新版） 会员活动立牌', productCodes: 'SP-202608-001 SP-202608-016' },
  { id: 'BF202608140019', store: '南京中山路店', org: '华东事业部', reason: '新店开业补发', date: '2026-08-17', status: '制单', approvalStatus: '已驳回', items: 1, qty: 2, applicant: '李木子', created: '2026-08-14 10:12', auditor: '周雨', auditedAt: '2026-08-14 15:36', orderNo: '—', note: '新店开业首批会员物料补发', rejectReason: '请补充物料破损图片后重新提交', productLines: makeProductLines([['poster', 2]]), productNames: '会员活动海报', productCodes: 'SP-202608-021' },
  { id: 'BF202608130011', store: '星河路店', org: '华东事业部', reason: '物料破损补发', date: '2026-08-16', status: '审核', approvalStatus: '已通过', orderStatus: '已审核', items: 3, qty: 4, applicant: '王小安', created: '2026-08-13 16:42', auditor: '李木子', auditedAt: '2026-08-14 09:08', orderNo: 'DD1001010000221', note: '会员活动物料破损补发', rejectReason: '', productLines: makeProductLines([['card', 1], ['stand', 1], ['poster', 2]]), productNames: '会员权益卡（新版） 会员活动立牌 会员活动海报', productCodes: 'SP-202608-001 SP-202608-016 SP-202608-021' },
  { id: 'BF202608120008', store: '苏州园区店', org: '华东事业部', reason: '版本换新补发', date: '2026-08-15', status: '审核', approvalStatus: '已通过', orderStatus: '制单', items: 2, qty: 3, applicant: '周雨', created: '2026-08-12 09:31', auditor: '李木子', auditedAt: '2026-08-12 14:22', orderNo: 'DD1001010000216', note: '商品属性校验导致门店订单审核失败，订单保留制单状态', rejectReason: '', productLines: makeProductLines([['card', 1], ['poster', 2]]), productNames: '会员权益卡（新版） 会员活动海报', productCodes: 'SP-202608-001 SP-202608-021' },
  { id: 'BF202608100007', store: '合肥政务区店', org: '华东事业部', reason: '物料破损补发', date: '2026-08-13', status: '审核', approvalStatus: '已通过', items: 2, qty: 2, applicant: '陈晨', created: '2026-08-10 15:18', auditor: '李木子', auditedAt: '2026-08-11 09:26', orderNo: '—', orderStatus: '—', note: '门店订单保存失败，待重试', orderError: '门店订单保存失败', rejectReason: '', productLines: makeProductLines([['card', 1], ['stand', 1]]), productNames: '会员权益卡（新版） 会员活动立牌', productCodes: 'SP-202608-001 SP-202608-016' },
  { id: 'BF202608110003', store: '杭州湖滨店', org: '华东事业部', reason: '物料破损补发', date: '2026-08-14', status: '作废', approvalStatus: '—', items: 1, qty: 1, applicant: '陈晨', created: '2026-08-11 11:06', auditor: '—', auditedAt: '—', orderNo: '—', note: '审批中申请主动作废', rejectReason: '', voidedAt: '2026-08-11 13:18', voidReason: '审批中申请主动作废', productLines: makeProductLines([['stand', 1]]), productNames: '会员活动立牌', productCodes: 'SP-202608-016' },
  { id: 'BF202608170001', store: '星河路店', org: '华东事业部', reason: '物料破损补发', date: '2026-08-19', status: '制单', approvalStatus: '—', items: 1, qty: 1, applicant: '王小安', created: '2026-08-17 08:46', auditor: '—', auditedAt: '—', orderNo: '—', note: '待补充物料图片', rejectReason: '', productLines: makeProductLines([['card', 1, false]]), productNames: '会员权益卡（新版）', productCodes: 'SP-202608-001' },
];

const MOBILE_TABS = ['全部', '制单', '审核', '作废'];
const MOBILE_TIME_TYPES = ['制单时间', '审核时间', '作废时间'];
const MOBILE_DATE_RANGES = ['全部', '今天', '昨日', '近七天', '本周', '上周', '本月', '自定义'];
const MOBILE_APPROVAL_STATUSES = ['审批中', '已通过', '已驳回'];
const DEFAULT_FILTER = {
  timeType: '制单时间',
  dateRange: '近七天',
  approvalStatus: '',
  customStart: '2026-08-11',
  customEnd: '2026-08-17',
};

const dateRangeBounds = {
  今天: ['2026-08-17', '2026-08-17'],
  昨日: ['2026-08-16', '2026-08-16'],
  近七天: ['2026-08-11', '2026-08-17'],
  本周: ['2026-08-17', '2026-08-23'],
  上周: ['2026-08-10', '2026-08-16'],
  本月: ['2026-08-01', '2026-08-31'],
};

function applicationTime(item, timeType) {
  if (timeType === '审核时间') return item.auditedAt;
  if (timeType === '作废时间') return item.voidedAt;
  return item.created;
}

function matchesDateFilter(item, filter) {
  if (filter.dateRange === '全部') return true;
  const value = applicationTime(item, filter.timeType);
  if (!value || value === '—') return false;
  const date = value.slice(0, 10);
  const [start, end] = filter.dateRange === '自定义'
    ? [filter.customStart, filter.customEnd]
    : dateRangeBounds[filter.dateRange];
  return (!start || date >= start) && (!end || date <= end);
}

const STATUS_TONE = {
  制单: 'draft',
  审批中: 'review',
  已审核: 'done',
  已通过: 'done',
  审核: 'done',
  已驳回: 'rejected',
  作废: 'canceled',
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
  const [searchType, setSearchType] = useState('商品');
  const [keyword, setKeyword] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState(DEFAULT_FILTER);
  const [draftFilter, setDraftFilter] = useState(DEFAULT_FILTER);
  const filtered = useMemo(() => applications.filter((item) => {
    const matchesTab = tab === '全部' || item.status === tab;
    const source = searchType === '商品'
      ? `${item.productNames} ${item.productCodes}`
      : item.id;
    const matchesKeyword = !keyword.trim() || source.toLowerCase().includes(keyword.trim().toLowerCase());
    const matchesApproval = !appliedFilter.approvalStatus || appliedFilter.approvalStatus === item.approvalStatus;
    return matchesTab && matchesKeyword && matchesApproval && matchesDateFilter(item, appliedFilter);
  }), [applications, appliedFilter, keyword, searchType, tab]);
  const openFilter = () => {
    setDraftFilter({ ...appliedFilter });
    setFilterOpen(true);
  };
  const updateDraft = (patch) => setDraftFilter((current) => ({ ...current, ...patch }));
  const toggleApproval = (status) => updateDraft({ approvalStatus: draftFilter.approvalStatus === status ? '' : status });
  const resetFilter = () => setDraftFilter({ ...DEFAULT_FILTER });
  const applyFilter = () => {
    setAppliedFilter({ ...draftFilter });
    setFilterOpen(false);
  };

  return (
    <main className="af-mobile-shell af-mobile-list">
      <header className="af-mobile-header"><span aria-hidden="true" /><h1>品牌物料补发</h1><span aria-hidden="true" /></header>
      <section className="af-mobile-search">
        <label>
          <select aria-label="搜索类型" value={searchType} onChange={(event) => { setSearchType(event.target.value); setKeyword(''); }}>
            <option>商品</option>
            <option>单号</option>
          </select>
          <ChevronDown size={14} />
        </label>
        <Search size={18} />
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder={searchType === '商品' ? '搜索商品名称/代码/条码' : '搜索补发申请单号'}
        />
        {keyword && <button type="button" aria-label="清空搜索" onClick={() => setKeyword('')}><X size={16} /></button>}
      </section>
      <section className="af-mobile-status-row">
        <nav className="af-mobile-tabs" aria-label="单据状态">{MOBILE_TABS.map((item) => <button type="button" key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</nav>
        <button type="button" aria-label="筛选" className="af-filter-entry" onClick={openFilter}>筛选<ListFilter size={17} /><i /></button>
      </section>
      <section className="af-mobile-results">
        {filtered.length === 0 && <div className="af-mobile-empty"><ClipboardList size={34} /><b>暂无符合条件的申请</b><p>切换状态或清空筛选条件后重试</p></div>}
        {filtered.map((item) => (
          <article className="af-application-card" key={item.id} onClick={() => onOpen(item)}>
            <div className="af-card-head">
              <b>{item.id}<ChevronRight size={16} /></b>
              <StatusBadge status={item.status} />
            </div>
            <div className="af-card-body">
              <p><span>补发内容</span><b>{item.reason} · {item.items} 项 / {item.qty} 件</b></p>
              <p><span>审批状态</span><b>{item.approvalStatus === '—' ? '—' : <StatusBadge status={item.approvalStatus} />}</b></p>
              <p><span>制单人</span><b>{item.applicant}　{item.created}</b></p>
              <p><span>审核人</span><b>{item.auditor === '—' ? '—' : <>{item.auditor}　{item.auditedAt}</>}</b></p>
              <p><span>关联门店订单</span><b className={item.orderNo === '—' ? '' : 'link'}>{item.orderNo === '—' ? '—' : item.orderNo + ' · ' + (item.orderStatus || '已审核')}</b></p>
              <p className="af-card-note"><span>单据备注</span><b>{item.note || '—'}</b></p>
            </div>
            {item.approvalStatus === '已驳回' && <footer><AlertTriangle size={14} /><span>驳回原因：{item.rejectReason}</span></footer>}
            {item.status === '作废' && <footer className="voided"><AlertTriangle size={14} /><span>作废原因：{item.voidReason}</span></footer>}
          </article>
        ))}
      </section>
      <button className="af-mobile-create" type="button" onClick={onCreate}><Plus size={20} />申请补发</button>
      <nav className="af-bottom-nav"><button type="button"><Home size={20} /><span>首页</span></button><button type="button"><ShoppingCart size={20} /><span>订货</span></button><button className="active" type="button"><ClipboardList size={20} /><span>单据</span></button><button type="button"><UserRound size={20} /><span>我的</span></button></nav>
      {filterOpen && <div className="af-filter-mask" onClick={() => setFilterOpen(false)}>
        <section className="af-filter-sheet" onClick={(event) => event.stopPropagation()}>
          <div className="af-filter-handle" />
          <header><h2>筛选</h2><button type="button" aria-label="关闭筛选" onClick={() => setFilterOpen(false)}><X size={20} /></button></header>
          <div className="af-filter-content">
            <section><h3>时间类型</h3><div className="af-filter-options columns-3">{MOBILE_TIME_TYPES.map((item) => <button type="button" key={item} className={draftFilter.timeType === item ? 'active' : ''} onClick={() => updateDraft({ timeType: item })}>{item}</button>)}</div></section>
            <section><h3>日期范围</h3><div className="af-filter-options columns-4">{MOBILE_DATE_RANGES.map((item) => <button type="button" key={item} className={draftFilter.dateRange === item ? 'active' : ''} onClick={() => updateDraft({ dateRange: item })}>{item}</button>)}</div></section>
            {draftFilter.dateRange === '自定义' && <section className="af-custom-range"><input aria-label="开始日期" type="date" value={draftFilter.customStart} onChange={(event) => updateDraft({ customStart: event.target.value })} /><span>至</span><input aria-label="结束日期" type="date" value={draftFilter.customEnd} onChange={(event) => updateDraft({ customEnd: event.target.value })} /></section>}
            <section><h3>审批状态</h3><div className="af-filter-options columns-3">{MOBILE_APPROVAL_STATUSES.map((item) => <button type="button" key={item} className={draftFilter.approvalStatus === item ? 'active' : ''} onClick={() => toggleApproval(item)}>{item}</button>)}</div></section>
          </div>
          <footer><button type="button" onClick={resetFilter}>重置</button><button type="button" className="primary" onClick={applyFilter}>确定</button></footer>
        </section>
      </div>}
    </main>
  );
}

function MobileForm({ initial, onBack, onSave, onSubmit }) {
  const [reason, setReason] = useState(initial?.reason || '物料破损补发');
  const [note, setNote] = useState(initial?.note || '');
  const [items, setItems] = useState(initial?.productLines?.map((item) => ({ ...item })) || [{ ...PRODUCTS[0], qty: 1, proof: false }]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const total = items.reduce((sum, item) => sum + item.qty, 0);
  const status = initial?.status || '制单';
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
    onSubmit({ ...initial, reason, note, productLines: items, items: items.length, qty: total });
  };
  return (
    <main className="af-mobile-shell af-mobile-form af-order-form">
      <header className="af-mobile-header"><button type="button" onClick={onBack}><ArrowLeft size={22} /></button><h1>{initial ? '品牌物料补发详情' : '新增品牌物料补发'}</h1><button type="button" aria-label="更多操作" className="af-more-button">•••</button></header>
      <div className="af-order-form-scroll">
        <section className="af-order-search" onClick={() => setPickerOpen(true)}><Search size={17} /><input readOnly placeholder="商品名称/代码/条码搜索" /><ScanLine size={18} /></section>
        <section className={'af-form-status ' + (STATUS_TONE[status] || 'draft')}><CircleCheck size={18} /><b>{status}</b></section>
        <section className="af-form-document">
          <header><b>{initial?.id || '保存后生成申请单号'}</b><span>收起⌃</span></header>
          <div className="af-form-document-fields">
            <label><span>申请门店 <i>*</i></span><button type="button">华东事业部 · 星河路店<ChevronRight size={16} /></button></label>
            <label><span>所属二级组织</span><b>华东事业部</b></label>
            {initial && <label><span>审批状态</span><b>{initial.approvalStatus || '—'}</b></label>}
            <label><span>补发原因 <i>*</i></span><select value={reason} onChange={(event) => setReason(event.target.value)}><option>物料破损补发</option><option>新店开业补发</option><option>版本换新补发</option></select></label>
            <label><span>制单人</span><b>{initial?.applicant || '王小安'}</b></label>
            <label><span>制单时间</span><b>{initial?.created || '保存后生成'}</b></label>
          </div>
          {initial?.approvalStatus === '已驳回' && <div className="af-detail-reject"><AlertTriangle size={15} /><span>驳回原因：{initial.rejectReason}</span></div>}
          <label className="af-form-note-row"><span>单据备注</span><input value={note} onChange={(event) => setNote(event.target.value)} placeholder="请输入单据备注" maxLength={200} /><ChevronRight size={16} /></label>
        </section>
        <section className="af-order-products">
          <header><button type="button">默认排序⌄</button><button type="button" onClick={() => setPickerOpen(true)}><Plus size={16} />添加</button></header>
          {items.map((item) => <article key={item.id} className="af-order-product-row">
            <div className="af-order-product-main">
              <img src={item.image} alt="" />
              <div><b>{item.name}</b><p>{item.code}</p><small>{item.spec}　倍数 {item.multiple}　可订 {item.min}–{item.max}</small></div>
              <Quantity value={item.qty} min={item.min} max={item.max} onChange={(qty) => updateItem(item.id, { qty })} />
            </div>
            <footer>
              <button type="button" className={item.proof ? 'af-proof-ready' : 'af-proof-upload'} onClick={() => updateItem(item.id, { proof: !item.proof })}>{item.proof ? <><FileImage size={15} />图片凭证已上传<Check size={15} /></> : <><Upload size={15} />上传图片凭证</>}</button>
              <button type="button" onClick={() => setItems((list) => list.filter((product) => product.id !== item.id))}><Trash2 size={15} />移除</button>
            </footer>
          </article>)}
        </section>
      </div>
      {message && <div className="af-mobile-toast">{message}</div>}
      <footer className="af-order-form-actions">
        <div><b>{total} 件</b><span>品项：{items.length}</span></div>
        <section><button type="button" onClick={() => onSave({ ...initial, reason, note, productLines: items, items: items.length, qty: total })}>保存</button><button type="button" onClick={submit}>审核</button></section>
      </footer>
      {pickerOpen && <div className="af-mobile-mask"><section className="af-mobile-picker"><div className="af-picker-handle" /><header><h2>选择补发商品</h2><button type="button" onClick={() => setPickerOpen(false)}><X size={20} /></button></header><div className="af-picker-search"><Search size={16} /><input placeholder="搜索商品编码 / 名称" /></div><p className="af-picker-scope">已按“{reason}”与门店可订范围过滤</p>{PRODUCTS.map((item) => { const selected = items.some((product) => product.id === item.id); return <button type="button" className="af-picker-product" key={item.id} onClick={() => setItems((list) => selected ? list.filter((product) => product.id !== item.id) : [...list, { ...item, qty: item.min, proof: false }])}><img src={item.image} alt="" /><span><b>{item.name}</b><small>{item.code} · {item.spec}</small></span><i className={selected ? 'selected' : ''}>{selected && <Check size={15} />}</i></button>; })}<footer><span>已选 {items.length} 项</span><button type="button" onClick={() => setPickerOpen(false)}>完成</button></footer></section></div>}
    </main>
  );
}
function MobileDetail({ item, onBack, onVoid }) {
  const detailProducts = item.productLines || [];
  const [voidConfirmOpen, setVoidConfirmOpen] = useState(false);
  const [voidMessage, setVoidMessage] = useState('');
  const canVoid = item.status === '审核' && item.approvalStatus === '审批中' && item.orderNo === '—';
  const confirmVoid = () => {
    const result = onVoid(item);
    setVoidConfirmOpen(false);
    setVoidMessage(result.message);
  };
  return (
    <main className="af-mobile-shell af-mobile-detail af-order-detail" data-layout-version="door-order-v2">
      <header className="af-mobile-header"><button type="button" onClick={onBack}><ArrowLeft size={22} /></button><h1>品牌物料补发详情</h1><button type="button" aria-label="更多操作" className="af-more-button">•••</button></header>
      <div className="af-detail-scroll">
        <section className="af-detail-search top"><Search size={16} /><input placeholder="商品名称/代码/条码搜索" /><ScanLine size={18} /></section>
        <section className={'af-detail-banner ' + (STATUS_TONE[item.status] || 'draft')}><CircleCheck size={18} /><b>{item.status}</b></section>
        <section className="af-detail-document">
          <header><b>{item.id}</b><span>收起⌃</span></header>
          <div className="af-detail-fields">
            <p><span>申请门店</span><b>{item.org} · {item.store}</b></p>
            <p><span>补发原因</span><b>{item.reason}</b></p>
            <p><span>审批状态</span><b>{item.approvalStatus}</b></p>
            <p><span>制单人</span><b>{item.applicant}　{item.created}</b></p>
            {item.auditor !== '—' && <p><span>审核人</span><b>{item.auditor}　{item.auditedAt}</b></p>}
            {item.status === '作废' && <p><span>作废时间</span><b>{item.voidedAt}</b></p>}
          </div>
          <div className="af-detail-note-row"><span>单据备注</span><b>{item.note || '—'}</b><ChevronRight size={16} /></div>
          {item.approvalStatus === '已驳回' && <div className="af-detail-reject"><AlertTriangle size={15} /><span>驳回原因：{item.rejectReason}</span></div>}
          {item.status === '作废' && <div className="af-detail-voided"><AlertTriangle size={15} /><span>作废原因：{item.voidReason}</span></div>}
          {item.orderNo !== '—' && <button type="button" className="af-detail-link-row"><span>关联门店订单</span><b>{item.orderNo} · {item.orderStatus || '已审核'}</b><ChevronRight size={16} /></button>}
        </section>
        <section className="af-order-products af-order-products-readonly">
          <header><button type="button">默认排序⌄</button></header>
          {detailProducts.map((product) => <article key={product.id} className="af-order-product-row">
            <div className="af-order-product-main">
              <img src={product.image} alt="" />
              <div><b>{product.name}</b><p>{product.code}</p><small>{product.spec}　倍数 {product.multiple}</small></div>
              <span className="af-readonly-qty"><em>申请数量</em><b>{product.qty}</b></span>
            </div>
            <footer><span>图片凭证</span><button type="button"><FileImage size={15} />查看 1 份<ChevronRight size={15} /></button></footer>
          </article>)}
        </section>
      </div>
      {canVoid && <footer className="af-detail-actions"><button type="button" onClick={() => setVoidConfirmOpen(true)}>作废</button></footer>}
      {voidMessage && <div className="af-mobile-toast">{voidMessage}</div>}
      {voidConfirmOpen && <div className="af-mobile-mask af-void-mask"><section className="af-void-dialog"><h2>确认作废</h2><p>系统将再次校验审批流程是否结束及是否已生成门店订单。确认发起作废？</p><footer><button type="button" onClick={() => setVoidConfirmOpen(false)}>取消</button><button type="button" onClick={confirmVoid}>确认作废</button></footer></section></div>}
    </main>
  );
}
export function MobileApplicationFlow() {
  const [page, setPage] = useState('list');
  const [applications, setApplications] = useState(SEED_APPLICATIONS);
  const [current, setCurrent] = useState(null);
  const open = (item) => { setCurrent(item); setPage('detail'); };
  const save = (draft) => {
    const id = draft?.id || `BF20260817${String(applications.length + 2).padStart(4, '0')}`;
    const productLines = draft?.productLines || [];
    const rejected = draft?.approvalStatus === '已驳回';
    const row = { ...draft, id, store: '星河路店', org: '华东事业部', status: '制单', approvalStatus: rejected ? '已驳回' : '—', applicant: '王小安', created: draft?.created || '2026-08-17 10:20', auditor: rejected ? draft.auditor : '—', auditedAt: rejected ? draft.auditedAt : '—', orderNo: '—', rejectReason: rejected ? draft.rejectReason : '', productLines, productNames: productLines.map((item) => item.name).join(' '), productCodes: productLines.map((item) => item.code).join(' ') };
    setApplications((list) => [row, ...list.filter((item) => item.id !== id)]);
    setPage('list');
  };
  const submit = (draft) => {
    const id = draft?.id || `BF20260817${String(applications.length + 2).padStart(4, '0')}`;
    const productLines = draft?.productLines || [];
    const result = { ...draft, id, store: '星河路店', org: '华东事业部', status: '审核', approvalStatus: '审批中', applicant: '王小安', created: draft?.created || '2026-08-17 10:20', auditor: '—', auditedAt: '—', orderNo: '—', rejectReason: '', productLines, productNames: productLines.map((item) => item.name).join(' '), productCodes: productLines.map((item) => item.code).join(' ') };
    setApplications((list) => [result, ...list.filter((item) => item.id !== id)]);
    setCurrent(result);
    setPage('detail');
  };
  const voidApplication = (item) => {
    if (item.approvalStatus !== '审批中') return { ok: false, message: '审批流程已结束，不允许作废' };
    if (item.orderNo !== '—') return { ok: false, message: '已生成关联门店订单，不允许作废' };
    const result = { ...item, status: '作废', approvalStatus: '—', voidedAt: '2026-08-24 11:30', voidReason: '审批中申请主动作废' };
    setApplications((list) => list.map((row) => row.id === item.id ? result : row));
    setCurrent(result);
    return { ok: true, message: '作废成功' };
  };
  if (page === 'form') return <MobileForm initial={current} onBack={() => setPage('list')} onSave={save} onSubmit={submit} />;
  if (page === 'detail' && current.status === '制单') return <MobileForm initial={current} onBack={() => setPage('list')} onSave={save} onSubmit={submit} />;
  if (page === 'detail') return <MobileDetail item={current} onBack={() => setPage('list')} onVoid={voidApplication} />;
  return <MobileList applications={applications} onCreate={() => { setCurrent(null); setPage('form'); }} onOpen={open} />;
}

function PcFrame({ children, activeTab, onTab, formTitle, orderNo }) {
  const orderDetail = activeTab === 'order-detail';
  return (
    <main className="paf-app">
      <header className="paf-topbar"><b>新零帮</b><button type="button"><Grid2X2 size={17} />应用</button><div><Search size={17} />搜索菜单、单据、商品</div><span /><em>南京众承 · 管理中心</em><i>王小安</i></header>
      <div className="paf-workspace">
        <aside>
          <strong>ERP连锁管理</strong>
          <button type="button"><ClipboardList size={18} />看板</button>
          <button type="button" className="active"><Truck size={18} />配送<ChevronRight size={15} /></button>
          <section>
            <span>业务操作</span>
            {orderDetail ? <span>品牌物料补发</span> : <b>品牌物料补发</b>}
            <button type="button" onClick={() => { window.location.search = '?view=pc'; }}>业务设置 · 补发配置</button>
            <span>配送参数</span>
            {orderDetail ? <b>门店订单</b> : <span>门店订单</span>}
          </section>
          <button type="button"><Boxes size={18} />采购</button>
        </aside>
        <section className="paf-main">
          <nav className="paf-tabs">
            <button type="button">SCM看板</button>
            <button type="button">门店订单</button>
            <button type="button" className={activeTab === 'list' ? 'active' : ''} onClick={() => onTab('list')}>品牌物料补发申请</button>
            {activeTab === 'form' && <button type="button" className="active">{formTitle}<X size={14} onClick={() => onTab('list')} /></button>}
            {orderDetail && <button type="button" className="active">门店订单 {orderNo}<X size={14} onClick={() => onTab('list')} /></button>}
          </nav>
          {children}
        </section>
      </div>
    </main>
  );
}
function PcApplicationList({ applications, onCreate, onView, onOpenOrder, onRetry }) {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('全部状态');
  const [approvalStatus, setApprovalStatus] = useState('全部状态');
  const [reason, setReason] = useState('全部原因');
  const [message, setMessage] = useState('');
  const filtered = applications.filter((item) => (!keyword || `${item.id} ${item.store}`.includes(keyword)) && (status === '全部状态' || item.status === status) && (approvalStatus === '全部状态' || item.approvalStatus === approvalStatus) && (reason === '全部原因' || item.reason === reason));
  const retry = (item) => {
    onRetry(item);
    setMessage(`重试成功，已生成门店订单 DD1001010000235，状态为已审核`);
  };
  return (
    <div className="paf-content">
      <header className="paf-title"><div><p>配送 / 业务操作</p><h1>品牌物料补发申请</h1></div></header>
      <section className="paf-filters">
        <label><span>申请单号</span><input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="请输入申请单号" /></label>
        <label><span>申请门店</span><button type="button">请选择门店<Search size={15} /></button></label>
        <label><span>补发原因</span><select value={reason} onChange={(e) => setReason(e.target.value)}><option>全部原因</option><option>物料破损补发</option><option>新店开业补发</option><option>版本换新补发</option></select></label>
        <label><span>单据状态</span><select value={status} onChange={(e) => setStatus(e.target.value)}><option>全部状态</option><option>制单</option><option>审核</option><option>作废</option></select></label>
        <label><span>审批状态</span><select value={approvalStatus} onChange={(e) => setApprovalStatus(e.target.value)}><option>全部状态</option><option>审批中</option><option>已通过</option><option>已驳回</option></select></label>
        <label><span>申请日期</span><div className="paf-range"><input type="date" /><i>至</i><input type="date" /></div></label>
        <footer><button type="button" className="primary"><Search size={15} />查询</button><button type="button" onClick={() => { setKeyword(''); setStatus('全部状态'); setApprovalStatus('全部状态'); setReason('全部原因'); }}><RotateCcw size={15} />重置</button></footer>
      </section>
      <section className="paf-toolbar"><button type="button" className="primary" onClick={onCreate}><Plus size={16} />新增</button><span>共 {filtered.length} 条</span></section>
      <div className="paf-table-wrap">
        <table>
          <thead><tr><th>申请单号</th><th>申请门店</th><th>所属组织</th><th>补发原因</th><th>商品/数量</th><th>单据状态</th><th>审批状态</th><th>关联门店订单</th><th>门店订单状态</th><th>申请人 / 申请时间</th><th>操作</th></tr></thead>
          <tbody>{filtered.map((item) => {
            const hasOrder = Boolean(item.orderNo && item.orderNo !== '—');
            const canRetry = item.status === '审核' && item.approvalStatus === '已通过' && !hasOrder;
            return <tr key={item.id}><td><button type="button" className="link" onClick={() => onView(item)}>{item.id}</button></td><td>{item.store}</td><td>{item.org}</td><td>{item.reason}</td><td>{item.items} 项 / {item.qty} 件</td><td><StatusBadge status={item.status} /></td><td>{item.approvalStatus === '—' ? '—' : <StatusBadge status={item.approvalStatus} />}</td><td>{hasOrder ? <button type="button" className="link" onClick={() => onOpenOrder(item)}>{item.orderNo}</button> : '—'}</td><td>{hasOrder ? <StatusBadge status={item.orderStatus || '已审核'} /> : '—'}</td><td>{item.applicant}<small>{item.created}</small></td><td><div className="paf-row-actions"><button type="button" className="link" onClick={() => onView(item)}>查看</button>{canRetry && <button type="button" className="link" onClick={() => retry(item)}><RotateCcw size={14} />重试</button>}</div></td></tr>;
          })}</tbody>
        </table>
      </div>
      <div className="paf-pagination"><span>共 {filtered.length} 条</span><button type="button">1</button><span>200 条/页</span></div>
      {message && <div className="paf-toast"><CheckCircle2 size={16} />{message}</div>}
    </div>
  );
}

function PcStoreOrderDetail({ application, onBack }) {
  const productLines = application.productLines?.length ? application.productLines : makeProductLines([['card', application.qty || 1]]);
  const totalQty = productLines.reduce((sum, item) => sum + item.qty, 0);
  return (
    <div className="paf-content paf-store-order-detail">
      <section className="paf-order-toolbar">
        <button type="button" disabled>保存</button>
        <button type="button" disabled>审核</button>
        <button type="button">业务操作⌄</button>
        <button type="button" onClick={onBack}><ArrowLeft size={15} />返回</button>
      </section>
      <nav className="paf-order-info-tabs"><button type="button" className="active">基本信息</button><button type="button">其他信息</button></nav>
      <section className="paf-order-balance"><span>门店余额：<b>5,836.91</b></span><span>授信额度：<b>100,000.00</b></span><span>可用余额：<b>105,836.91</b></span><i>{application.orderStatus || '已审核'}</i></section>
      <section className="paf-order-head-grid">
        <p><span>补货门店</span><b>{application.store}</b></p>
        <p><span>补货组织</span><b>{application.org}</b></p>
        <p><span>单据号</span><b>{application.orderNo}</b></p>
        <p><span>订单类型</span><b>仓配</b></p>
        <p><span>配送日</span><b>{application.date}</b></p>
        <p><span>业务来源</span><b>品牌物料补发</b></p>
        <p><span>来源申请单</span><b>{application.id}</b></p>
        <p className="wide"><span>留言备注</span><b>【由物料补发生成的门店订单】</b></p>
      </section>
      <div className="paf-order-detail-table">
        <table>
          <thead><tr><th>序号</th><th>商品代码</th><th>商品条码</th><th>商品名称</th><th>采购规格</th><th>商品类别</th><th>单位</th><th>要货数量</th><th>单价</th><th>金额</th></tr></thead>
          <tbody>{productLines.map((item, index) => <tr key={item.id}><td>{index + 1}</td><td><button type="button">{item.code}</button></td><td>{`695000000${index + 1}`}</td><td>{item.name}</td><td>{item.spec}</td><td>品牌物料</td><td>件</td><td>{item.qty.toFixed(3)}</td><td>0.00</td><td>0.00</td></tr>)}</tbody>
          <tfoot><tr><td colSpan="7">合计</td><td>{totalQty.toFixed(3)}</td><td>—</td><td>0.00</td></tr></tfoot>
        </table>
      </div>
      <footer className="paf-order-detail-footer"><span>关键词：<input /></span><button type="button">上一条</button><button type="button">下一条</button><i>共 {productLines.length} 条　1　200 条/页</i></footer>
    </div>
  );
}

function PcApplicationForm({ initial, readonly = false, onBack, onSave, onSubmit, onVoid }) {
  const [store, setStore] = useState(initial?.store || '星河路店');
  const [reason, setReason] = useState(initial?.reason || '物料破损补发');
  const [note, setNote] = useState(initial?.note || '');
  const [items, setItems] = useState([{ ...PRODUCTS[0], qty: 1, proof: true }, { ...PRODUCTS[1], qty: 1, proof: false }]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [voidConfirmOpen, setVoidConfirmOpen] = useState(false);
  const [message, setMessage] = useState('');
  const title = readonly ? '查看补发申请' : initial ? '编辑补发申请' : '新增补发申请';
  const total = items.reduce((sum, item) => sum + item.qty, 0);
  const canVoid = initial?.status === '审核' && initial?.approvalStatus === '审批中' && initial?.orderNo === '—';
  const submit = () => { if (items.some((item) => !item.proof)) return setMessage('存在未上传图片凭证的商品，请补充后再提交。'); if (items.some((item) => item.qty % item.multiple !== 0)) return setMessage('商品数量不符合订购倍数，请调整后再提交。'); onSubmit({ ...initial, store, org: '华东事业部', reason, note, items: items.length, qty: total }); };
  return <div className="paf-content paf-form-page" editing={String(Boolean(initial))}><header className="paf-title"><div><p>配送 / 品牌物料补发申请 / {title}</p><h1>{title}</h1></div><button type="button" onClick={onBack}><ArrowLeft size={15} />返回列表</button></header>{initial?.approvalStatus === '已驳回' && <div className="paf-reject-banner"><AlertTriangle size={17} /><b>审核驳回：</b>{initial.rejectReason}</div>}<section className="paf-form-card"><h2>申请信息</h2><div className="paf-form-grid"><label><span>申请门店 <i>*</i></span><select disabled={readonly} value={store} onChange={(e) => setStore(e.target.value)}><option>星河路店</option><option>南京中山路店</option><option>苏州园区店</option></select></label><label><span>所属二级组织</span><input disabled value="华东事业部" /></label>{initial && <label><span>审批状态</span><input disabled value={initial.approvalStatus || '—'} /></label>}<label><span>补发原因 <i>*</i></span><select disabled={readonly} value={reason} onChange={(e) => setReason(e.target.value)}><option>物料破损补发</option><option>新店开业补发</option><option>版本换新补发</option></select></label><label className="wide"><span>申请说明</span><textarea disabled={readonly} value={note} onChange={(e) => setNote(e.target.value)} placeholder="请说明物料损坏、缺失或换新情况" /></label></div></section><section className="paf-form-card"><div className="paf-card-title"><div><h2>补发商品明细 <i>*</i></h2><p>商品范围取“补发配置”与当前门店可订商品范围的交集</p></div>{!readonly && <button type="button" className="primary" onClick={() => setPickerOpen(true)}><Plus size={15} />添加商品</button>}</div><div className="paf-rules"><Info size={16} /><span>审批通过后先保存门店订单，再执行审核；门店订单按生成时计算的配送日配送。</span></div><div className="paf-form-table"><table><thead><tr><th>商品图片</th><th>商品编码</th><th>商品名称</th><th>规格</th><th>订购属性</th><th>申请数量</th><th>图片凭证</th>{!readonly && <th>操作</th>}</tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><img src={item.image} alt="" /></td><td>{item.code}</td><td>{item.name}</td><td>{item.spec}</td><td>倍数 {item.multiple} / {item.min}–{item.max} 件</td><td>{readonly ? item.qty : <Quantity value={item.qty} min={item.min} max={item.max} onChange={(qty) => setItems((list) => list.map((p) => p.id === item.id ? { ...p, qty } : p))} />}</td><td>{item.proof ? <button type="button" className="paf-proof" disabled={readonly} onClick={() => setItems((list) => list.map((p) => p.id === item.id ? { ...p, proof: false } : p))}><FileImage size={15} />查看凭证<CheckCircle2 size={15} /></button> : <button type="button" className="paf-upload" disabled={readonly} onClick={() => setItems((list) => list.map((p) => p.id === item.id ? { ...p, proof: true } : p))}><Upload size={15} />上传图片</button>}</td>{!readonly && <td><button type="button" className="link danger" onClick={() => setItems((list) => list.filter((p) => p.id !== item.id))}>移除</button></td>}</tr>)}</tbody></table></div><footer className="paf-form-summary"><span>共 {items.length} 项，申请 {total} 件</span></footer></section>{message && <div className="paf-form-error"><AlertTriangle size={16} />{message}</div>}<footer className="paf-page-actions"><button type="button" onClick={onBack}>取消</button>{canVoid && <button type="button" className="danger" onClick={() => setVoidConfirmOpen(true)}>作废</button>}{!readonly && <><button type="button" onClick={() => onSave({ ...initial, store, org: '华东事业部', reason, note, items: items.length, qty: total })}>保存草稿</button><button type="button" className="primary" onClick={submit}>审核</button></>}</footer>{pickerOpen && <div className="paf-modal-mask"><section className="paf-product-modal"><header><div><h2>选择商品</h2><p>展示当前用户权限可见商品，保存时进入补发配置与门店订购规则校验</p></div><button type="button" onClick={() => setPickerOpen(false)}><X size={20} /></button></header><div className="paf-modal-search"><label>商品编码/名称<input placeholder="请输入商品编码、名称或条码" /></label><label>商品分类<select><option>全部分类</option><option>品牌物料</option></select></label><button type="button" className="primary"><Search size={15} />查询</button></div><div className="paf-picker-table"><table><thead><tr><th>选择</th><th>商品编码</th><th>商品名称</th><th>规格</th><th>订购属性</th></tr></thead><tbody>{PRODUCTS.map((item) => { const selected = items.some((p) => p.id === item.id); return <tr key={item.id} className={selected ? 'selected' : ''} onClick={() => setItems((list) => selected ? list.filter((p) => p.id !== item.id) : [...list, { ...item, qty: item.min, proof: false }])}><td><input type="checkbox" readOnly checked={selected} /></td><td>{item.code}</td><td>{item.name}</td><td>{item.spec}</td><td>倍数 {item.multiple} / {item.min}–{item.max}</td></tr>; })}</tbody></table></div><footer><span>已选 {items.length} 项</span><button type="button" onClick={() => setPickerOpen(false)}>取消</button><button type="button" className="primary" onClick={() => setPickerOpen(false)}>确认</button></footer></section></div>}{voidConfirmOpen && <div className="paf-modal-mask"><section className="paf-void-modal"><h2>确认作废</h2><p>系统将再次校验审批流程是否结束及是否已生成门店订单。确认发起作废？</p><footer><button type="button" onClick={() => setVoidConfirmOpen(false)}>取消</button><button type="button" onClick={() => { onVoid(initial); setVoidConfirmOpen(false); }}>确认作废</button></footer></section></div>}</div>;
}

export function PcApplicationModule() {
  const [tab, setTab] = useState('list');
  const [mode, setMode] = useState('edit');
  const [current, setCurrent] = useState(null);
  const [applications, setApplications] = useState(SEED_APPLICATIONS);
  const openForm = (item = null, nextMode = 'edit') => { setCurrent(item); setMode(nextMode); setTab('form'); };
  const openApplication = (item) => openForm(item, item.status === '制单' ? 'edit' : 'view');
  const openOrder = (item) => { setCurrent(item); setTab('order-detail'); };
  const retryOrder = (item) => {
    setApplications((list) => list.map((row) => row.id === item.id ? {
      ...row,
      orderNo: 'DD1001010000235',
      orderStatus: '已审核',
      orderError: '',
      note: '门店订单重试成功，已回写关联单据',
    } : row));
  };
  const voidApplication = (item) => {
    if (item.approvalStatus !== '审批中' || item.orderNo !== '—') return false;
    const result = { ...item, status: '作废', approvalStatus: '—', voidedAt: '2026-08-24 11:30', voidReason: '审批中申请主动作废' };
    setApplications((list) => list.map((row) => row.id === item.id ? result : row));
    setCurrent(result);
    return true;
  };
  const save = (draft, status) => { const id = draft?.id || `BF20260817${String(applications.length + 2).padStart(4, '0')}`; const row = { ...draft, id, status, approvalStatus: draft?.approvalStatus || '—', applicant: '王小安', created: draft?.created || '2026-08-17 10:20', auditor: draft?.auditor || '—', auditedAt: draft?.auditedAt || '—', orderNo: draft?.orderNo || '—', rejectReason: draft?.rejectReason || '', productNames: draft?.productNames || '会员权益卡（新版）', productCodes: draft?.productCodes || 'SP-202608-001' }; setApplications((list) => [row, ...list.filter((item) => item.id !== id)]); setTab('list'); };
  const formTitle = mode === 'view' ? '查看补发申请' : current ? '编辑补发申请' : '新增补发申请';
  let content;
  if (tab === 'list') {
    content = <PcApplicationList applications={applications} onCreate={() => openForm()} onView={openApplication} onOpenOrder={openOrder} onRetry={retryOrder} />;
  } else if (tab === 'order-detail') {
    content = <PcStoreOrderDetail application={current} onBack={() => setTab('list')} />;
  } else {
    content = <PcApplicationForm initial={current} readonly={mode === 'view'} onBack={() => setTab('list')} onSave={(draft) => save(draft, '制单')} onSubmit={(draft) => save({ ...draft, approvalStatus: '审批中', rejectReason: '', auditor: '—', auditedAt: '—' }, '审核')} onVoid={voidApplication} />;
  }
  return <PcFrame activeTab={tab} onTab={setTab} formTitle={formTitle} orderNo={current?.orderNo}>{content}</PcFrame>;
}
