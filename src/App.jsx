import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Edit3,
  FileImage,
  History,
  Info,
  MapPin,
  Minus,
  PackagePlus,
  Plus,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Truck,
  Workflow,
  X,
} from 'lucide-react';

const productAsset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const reasonProducts = {
  '物料破损补发': [
    { id: 'card', name: '会员权益卡（新版）', spec: '100 张 / 包', code: 'SP-202608-001', barcode: '6901234568001', image: productAsset('product-member-card.png'), limit: 2 },
    { id: 'stand', name: '会员活动立牌', spec: 'A4 / 亚克力', code: 'SP-202608-016', barcode: '6901234568016', image: productAsset('product-acrylic-stand.png'), limit: 4 },
    { id: 'poster', name: '会员活动海报', spec: 'A3 / 20 张', code: 'SP-202608-021', barcode: '6901234568021', image: productAsset('product-poster.png'), limit: 2 },
  ],
  '新店开业补发': [
    { id: 'card', name: '会员权益卡（新版）', spec: '100 张 / 包', code: 'SP-202608-001', barcode: '6901234568001', image: productAsset('product-member-card.png'), limit: 5 },
    { id: 'stand', name: '会员活动立牌', spec: 'A4 / 亚克力', code: 'SP-202608-016', barcode: '6901234568016', image: productAsset('product-acrylic-stand.png'), limit: 8 },
  ],
};

function QuantityControl({ value, max, onChange }) {
  return (
    <div className="quantity-control" aria-label="申请数量">
      <button type="button" aria-label="减少数量" onClick={() => onChange(Math.max(1, value - 1))}><Minus size={15} /></button>
      <span>{value}</span>
      <button type="button" aria-label="增加数量" onClick={() => onChange(Math.min(max, value + 1))}><Plus size={15} /></button>
    </div>
  );
}

const seedReasons = [
  { code: 'BFYY0001', name: '物料破损补发', description: '已到店品牌物料发生破损', org: '全部二级组织', products: 3, status: '启用', editor: '王小安', time: '2026-08-07 14:20' },
  { code: 'BFYY0002', name: '新店开业补发', description: '新店开业首批物料缺失或破损', org: '华东、华南事业部', products: 5, status: '启用', editor: '李木子', time: '2026-08-06 09:35' },
  { code: 'BFYY0003', name: '版本换新补发', description: '旧版物料统一换新', org: '华东事业部', products: 2, status: '停用', editor: '王小安', time: '2026-07-28 17:10' },
];

const seedApprovals = [
  { org: '华东事业部', reason: '物料破损补发', method: '审批模板', template: '品牌物料补发审批-华东', validity: '2026-08-01 起', status: '启用', editor: '王小安', time: '2026-08-07 15:05' },
  { org: '华南事业部', reason: '物料破损补发', method: '审批模板', template: '品牌物料补发审批-华南', validity: '2026-08-01 起', status: '启用', editor: '李木子', time: '2026-08-07 11:42' },
  { org: '华东事业部', reason: '新店开业补发', method: '无需审批', template: '—', validity: '2026-08-01 起', status: '启用', editor: '王小安', time: '2026-08-06 10:20' },
];

const pcPermissionProducts = [
  { id: 'pc-card', code: 'SP-202608-001', barcode: '6901234568001', name: '会员权益卡（新版）', category: '品牌物料', department: '市场部', spec: '100 张 / 包', status: '启用' },
  { id: 'pc-stand', code: 'SP-202608-016', barcode: '6901234568016', name: '会员活动立牌', category: '品牌物料', department: '市场部', spec: 'A4 / 亚克力', status: '启用' },
  { id: 'pc-poster', code: 'SP-202608-021', barcode: '6901234568021', name: '会员活动海报', category: '品牌物料', department: '市场部', spec: 'A3 / 20 张', status: '启用' },
  { id: 'pc-bag', code: 'HC-202608-035', barcode: '6901234568035', name: '环保购物袋（中号）', category: '门店耗材', department: '运营部', spec: '50 个 / 捆', status: '启用' },
  { id: 'pc-label', code: 'HC-202608-042', barcode: '6901234568042', name: '收银台价格提示牌', category: '门店耗材', department: '运营部', spec: 'A6 / 10 个', status: '启用' },
  { id: 'pc-water', code: 'SP-202607-108', barcode: '6901234568108', name: '饮用天然水', category: '饮料冲调', department: '食品部', spec: '550ml × 24 瓶', status: '启用' },
  { id: 'pc-tissue', code: 'SP-202607-126', barcode: '6901234568126', name: '原生木浆抽纸', category: '家居百货', department: '非食部', spec: '3 层 × 6 包', status: '启用' },
  { id: 'pc-cookie', code: 'SP-202607-143', barcode: '6901234568143', name: '黄油风味曲奇', category: '休闲食品', department: '食品部', spec: '400g / 盒', status: '启用' },
];

const approvalRecordKey = (item) => `${item.org}|${item.reason}`;

function PcConfig() {
  const [tab, setTab] = useState('reason');
  const [reasons, setReasons] = useState(seedReasons);
  const [approvals, setApprovals] = useState(seedApprovals);
  const [keyword, setKeyword] = useState('');
  const [selectedReasonCodes, setSelectedReasonCodes] = useState([]);
  const [selectedApprovalKeys, setSelectedApprovalKeys] = useState([]);
  const [changeLogOpen, setChangeLogOpen] = useState(false);
  const [expandedChangeRows, setExpandedChangeRows] = useState([]);
  const [copiedChangeRow, setCopiedChangeRow] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [boundProductIds, setBoundProductIds] = useState([]);
  const [productPickerOpen, setProductPickerOpen] = useState(false);
  const [productKeyword, setProductKeyword] = useState('');
  const [productCategory, setProductCategory] = useState('全部分类');
  const [productDepartment, setProductDepartment] = useState('全部部门');
  const [draftProductIds, setDraftProductIds] = useState([]);
  const [approvalMethod, setApprovalMethod] = useState('审批模板');
  const [pcToast, setPcToast] = useState('');

  const filteredReasons = reasons.filter((item) => item.name.includes(keyword.trim()));
  const selectedKeys = tab === 'reason' ? selectedReasonCodes : selectedApprovalKeys;
  const allReasonsSelected = filteredReasons.length > 0 && filteredReasons.every((item) => selectedReasonCodes.includes(item.code));
  const allApprovalsSelected = approvals.length > 0 && approvals.every((item) => selectedApprovalKeys.includes(approvalRecordKey(item)));
  const selectedConfig = tab === 'reason'
    ? reasons.find((item) => selectedReasonCodes.includes(item.code))
    : approvals.find((item) => selectedApprovalKeys.includes(approvalRecordKey(item)));
  const changeLogRecords = selectedConfig ? (tab === 'reason' ? [
    { time: '2026-08-07 14:20:36', user: '王小安', detail: `状态：停用 → ${selectedConfig.status} ｜绑定商品：SP-202608-001,SP-202608-016 → SP-202608-001,SP-202608-016,SP-202608-021` },
    { time: '2026-08-06 10:35:18', user: '李木子', detail: `应用组织：华东事业部 → ${selectedConfig.org}` },
    { time: '2026-08-05 16:42:09', user: '王小安', detail: `原因说明：门店品牌物料破损 → ${selectedConfig.description}` },
  ] : [
    { time: '2026-08-07 15:05:22', user: '王小安', detail: `审批模板：品牌物料补发审批-v1 → ${selectedConfig.template} ｜状态：停用 → ${selectedConfig.status}` },
    { time: '2026-08-06 11:42:08', user: '李木子', detail: `审批方式：无需审批 → ${selectedConfig.method}` },
    { time: '2026-08-05 09:18:37', user: '王小安', detail: `生效时间：2026-07-01 00:00 → ${selectedConfig.validity}` },
  ]) : [];
  const boundProducts = pcPermissionProducts.filter((item) => boundProductIds.includes(item.id));
  const filteredPermissionProducts = useMemo(() => {
    const normalizedKeyword = productKeyword.trim().toLowerCase();
    return pcPermissionProducts.filter((item) => {
      const matchesKeyword = !normalizedKeyword || `${item.code} ${item.barcode} ${item.name}`.toLowerCase().includes(normalizedKeyword);
      const matchesCategory = productCategory === '全部分类' || item.category === productCategory;
      const matchesDepartment = productDepartment === '全部部门' || item.department === productDepartment;
      return matchesKeyword && matchesCategory && matchesDepartment;
    });
  }, [productCategory, productDepartment, productKeyword]);
  const allFilteredProductsSelected = filteredPermissionProducts.length > 0 && filteredPermissionProducts.every((item) => draftProductIds.includes(item.id));
  const showToast = (text) => {
    setPcToast(text);
    window.setTimeout(() => setPcToast(''), 2400);
  };
  const switchConfigTab = (nextTab) => {
    setTab(nextTab);
    setKeyword('');
    setSelectedReasonCodes([]);
    setSelectedApprovalKeys([]);
    setChangeLogOpen(false);
  };
  const toggleReasonSelection = (code) => {
    setSelectedReasonCodes((current) => current.includes(code) ? current.filter((item) => item !== code) : [...current, code]);
  };
  const toggleApprovalSelection = (key) => {
    setSelectedApprovalKeys((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  };
  const toggleAllReasons = () => {
    const visibleCodes = filteredReasons.map((item) => item.code);
    setSelectedReasonCodes((current) => allReasonsSelected ? current.filter((code) => !visibleCodes.includes(code)) : [...new Set([...current, ...visibleCodes])]);
  };
  const toggleAllApprovals = () => {
    const visibleKeys = approvals.map(approvalRecordKey);
    setSelectedApprovalKeys(allApprovalsSelected ? [] : visibleKeys);
  };
  const openChangeLog = () => {
    if (selectedKeys.length !== 1) return;
    setExpandedChangeRows([]);
    setCopiedChangeRow(null);
    setChangeLogOpen(true);
    window.setTimeout(() => document.querySelector('.pc-change-log-close')?.focus(), 0);
  };
  const copyChangeDetail = async (detail, index) => {
    try {
      await navigator.clipboard.writeText(detail);
    } catch {
      // The visual confirmation remains available when a browser blocks clipboard access.
    }
    setCopiedChangeRow(index);
    window.setTimeout(() => setCopiedChangeRow(null), 1600);
  };
  const openReasonDrawer = (mode, record) => {
    const initialCount = mode === 'new' ? 1 : Math.min(record?.products || 1, pcPermissionProducts.length);
    setBoundProductIds(pcPermissionProducts.slice(0, initialCount).map((item) => item.id));
    setDrawer({ kind: 'reason', mode, record });
  };
  const closeDrawer = () => {
    setDrawer(null);
    setProductPickerOpen(false);
  };
  const openProductPicker = () => {
    setProductKeyword('');
    setProductCategory('全部分类');
    setProductDepartment('全部部门');
    setDraftProductIds(boundProductIds);
    setProductPickerOpen(true);
  };
  const toggleDraftProduct = (id) => {
    setDraftProductIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };
  const toggleAllFilteredProducts = () => {
    const filteredIds = filteredPermissionProducts.map((item) => item.id);
    setDraftProductIds((current) => allFilteredProductsSelected
      ? current.filter((id) => !filteredIds.includes(id))
      : [...new Set([...current, ...filteredIds])]);
  };
  const confirmProductPicker = () => {
    setBoundProductIds([...new Set(draftProductIds)]);
    setProductPickerOpen(false);
    showToast(`已选择 ${draftProductIds.length} 个商品`);
  };
  const toggleReason = (code) => setReasons((list) => list.map((item) => item.code === code ? { ...item, status: item.status === '启用' ? '停用' : '启用' } : item));
  const toggleApproval = (target) => setApprovals((list) => list.map((item) => item.org === target.org && item.reason === target.reason ? { ...item, status: item.status === '启用' ? '停用' : '启用' } : item));
  const saveDrawer = () => {
    if (drawer.kind === 'reason' && boundProductIds.length === 0) {
      showToast('请至少绑定 1 个商品');
      return;
    }
    if (drawer.kind === 'reason' && drawer.mode === 'new') {
      setReasons((list) => [{ code: 'BFYY0004', name: '活动物料补发', description: '门店活动期间物料破损补发', org: '华北事业部', products: boundProductIds.length, status: '启用', editor: '当前用户', time: '刚刚' }, ...list]);
    }
    if (drawer.kind === 'approval' && drawer.mode === 'new') {
      setApprovals((list) => [{ org: '华北事业部', reason: '物料破损补发', method: approvalMethod, template: approvalMethod === '审批模板' ? '品牌物料补发审批-华北' : '—', validity: '2026-08-09 起', status: '启用', editor: '当前用户', time: '刚刚' }, ...list]);
    }
    closeDrawer();
    showToast(drawer.mode === 'new' ? '配置已新增' : '配置已保存，历史申请不受影响');
  };

  return (
    <main className="pc-app">
      <header className="pc-topbar">
        <div className="pc-brand">新零帮</div>
        <button className="pc-app-grid" type="button"><Boxes size={19} />应用</button>
        <div className="pc-global-search"><Search size={17} /><span>搜索菜单、单据、商品</span></div>
        <div className="pc-top-spacer" />
        <span>南京众承 · 管理中心</span>
        <span className="pc-user">王小安</span>
      </header>
      <div className="pc-workspace">
        <aside className="pc-sidebar">
          <div className="pc-system-name">ERP连锁管理</div>
          <button type="button"><ClipboardList size={18} />看板</button>
          <button type="button" className="active"><Truck size={18} />配送<ChevronRight size={15} /></button>
          <div className="pc-submenu"><span>业务操作</span><b>业务设置</b><span>配送参数</span><span>门店订单</span></div>
          <button type="button"><Boxes size={18} />采购</button>
          <button type="button"><Settings size={18} />基础设置</button>
        </aside>
        <section className="pc-main">
          <nav className="pc-page-tabs"><span>SCM看板</span><span>门店订单</span><span className="active">品牌物料补发配置 <X size={13} /></span></nav>
          <div className="pc-content-card">
            <div className="pc-title-row">
              <div><p className="pc-breadcrumb">配送 / 业务设置</p><h1>品牌物料补发配置</h1></div>
            </div>
            <div className="pc-config-tabs">
              <button type="button" className={tab === 'reason' ? 'active' : ''} onClick={() => switchConfigTab('reason')}>补发原因</button>
              <button type="button" className={tab === 'approval' ? 'active' : ''} onClick={() => switchConfigTab('approval')}>审批配置</button>
            </div>

            {tab === 'reason' ? (
              <>
                <div className="pc-filter-panel">
                  <label>原因名称<input value={keyword} onChange={(event) => { setKeyword(event.target.value); setSelectedReasonCodes([]); }} placeholder="请输入原因名称" /></label>
                  <label>状态<select defaultValue="启用"><option>启用</option><option>停用</option><option>全部</option></select></label>
                  <label>应用组织<button type="button" className="pc-picker">请选择二级组织 <Search size={14} /></button></label>
                  <label>绑定商品<button type="button" className="pc-picker">请选择商品 <Search size={14} /></button></label>
                  <div className="pc-filter-actions"><button type="button" className="pc-primary" onClick={() => { setSelectedReasonCodes([]); showToast(`已查询到 ${filteredReasons.length} 条配置`); }}><Search size={15} />查询</button><button type="button" onClick={() => { setKeyword(''); setSelectedReasonCodes([]); }}><RotateCcw size={15} />重置</button></div>
                </div>
                <div className="pc-toolbar"><button type="button" className="pc-primary" onClick={() => openReasonDrawer('new')}><Plus size={16} />新增</button><button type="button" disabled={selectedReasonCodes.length !== 1} onClick={openChangeLog}><History size={15} />修改记录</button><span>原因只定义业务白名单，申请与出单仍按门店和实际发货仓动态校验。</span></div>
                <div className="pc-table-wrap"><table className="pc-table"><thead><tr><th><input type="checkbox" aria-label="全选补发原因" checked={allReasonsSelected} onChange={toggleAllReasons} /></th><th>原因编码</th><th>原因名称</th><th>原因说明</th><th>应用组织</th><th>绑定商品数</th><th>状态</th><th>修改人 / 修改时间</th><th>操作</th></tr></thead><tbody>{filteredReasons.map((item) => <tr key={item.code} className={selectedReasonCodes.includes(item.code) ? 'selected' : ''}><td><input type="checkbox" aria-label={`选择${item.name}`} checked={selectedReasonCodes.includes(item.code)} onChange={() => toggleReasonSelection(item.code)} /></td><td><a>{item.code}</a></td><td>{item.name}</td><td>{item.description}</td><td>{item.org}</td><td><button className="pc-link" type="button" onClick={() => openReasonDrawer('edit', item)}>{item.products} 个商品</button></td><td><span className={`pc-status ${item.status === '启用' ? 'on' : 'off'}`}>{item.status}</span></td><td>{item.editor}<small>{item.time}</small></td><td><button className="pc-link" type="button" onClick={() => openReasonDrawer('edit', item)}>编辑</button><button className="pc-link" type="button" onClick={() => toggleReason(item.code)}>{item.status === '启用' ? '停用' : '启用'}</button></td></tr>)}</tbody></table></div>
              </>
            ) : (
              <>
                <div className="pc-filter-panel approval-filter">
                  <label>二级组织<button type="button" className="pc-picker">请选择二级组织 <Search size={14} /></button></label>
                  <label>补发原因<select><option>全部原因</option><option>物料破损补发</option><option>新店开业补发</option></select></label>
                  <label>状态<select defaultValue="启用"><option>启用</option><option>停用</option><option>全部</option></select></label>
                  <div className="pc-filter-actions"><button type="button" className="pc-primary" onClick={() => showToast(`已查询到 ${approvals.length} 条配置`)}><Search size={15} />查询</button><button type="button"><RotateCcw size={15} />重置</button></div>
                </div>
                <div className="pc-toolbar"><button type="button" className="pc-primary" onClick={() => setDrawer({ kind: 'approval', mode: 'new' })}><Plus size={16} />新增审批配置</button><button type="button" disabled={selectedApprovalKeys.length !== 1} onClick={openChangeLog}><History size={15} />修改记录</button><span><AlertTriangle size={14} /> 未匹配到有效配置时，门店申请将被阻止提交。</span></div>
                <div className="pc-table-wrap"><table className="pc-table"><thead><tr><th><input type="checkbox" aria-label="全选审批配置" checked={allApprovalsSelected} onChange={toggleAllApprovals} /></th><th>二级组织</th><th>补发原因</th><th>审批方式</th><th>审批模板</th><th>生效时间</th><th>状态</th><th>修改人 / 修改时间</th><th>操作</th></tr></thead><tbody>{approvals.map((item) => {
                  const itemKey = approvalRecordKey(item);
                  return <tr key={itemKey} className={selectedApprovalKeys.includes(itemKey) ? 'selected' : ''}><td><input type="checkbox" aria-label={`选择${item.org}${item.reason}`} checked={selectedApprovalKeys.includes(itemKey)} onChange={() => toggleApprovalSelection(itemKey)} /></td><td>{item.org}</td><td>{item.reason}</td><td>{item.method}</td><td><a>{item.template}</a></td><td>{item.validity}</td><td><span className={`pc-status ${item.status === '启用' ? 'on' : 'off'}`}>{item.status}</span></td><td>{item.editor}<small>{item.time}</small></td><td><button className="pc-link" type="button" onClick={() => { setApprovalMethod(item.method); setDrawer({ kind: 'approval', mode: 'edit', record: item }); }}>编辑</button><button className="pc-link" type="button" onClick={() => toggleApproval(item)}>{item.status === '启用' ? '停用' : '启用'}</button></td></tr>;
                })}</tbody></table></div>
              </>
            )}
            <div className="pc-pagination"><span>共 {tab === 'reason' ? filteredReasons.length : approvals.length} 条</span><button type="button">1</button><span>200 条/页</span></div>
          </div>
        </section>
      </div>

      {drawer && <div className="pc-drawer-mask"><aside className="pc-drawer">
        <header><div><h2>{drawer.mode === 'new' ? '新增' : '编辑'}{drawer.kind === 'reason' ? '补发原因' : '审批配置'}</h2><p>{drawer.kind === 'reason' ? '配置申请端可选原因与允许补发的商品范围' : '唯一键：二级组织 + 补发原因'}</p></div><button type="button" onClick={closeDrawer}><X size={21} /></button></header>
        {drawer.kind === 'reason' ? <div className="pc-drawer-body">
          <label><span className="pc-field-label">原因名称 <i>*</i></span><input defaultValue={drawer.record?.name || '活动物料补发'} /></label>
          <label><span className="pc-field-label">原因说明</span><textarea defaultValue={drawer.record?.description || '门店活动期间品牌物料发生破损'} /></label>
          <label><span className="pc-field-label">应用组织 <i>*</i></span><button className="pc-select-wide" type="button">{drawer.record?.org || '华北事业部'}<ChevronDown size={15} /></button></label>
          <div className="pc-binding-title"><span>绑定商品 <i>*</i></span><button type="button" onClick={openProductPicker}><Plus size={15} />添加商品</button></div>
          <table className="pc-mini-table"><thead><tr><th>商品编码</th><th>商品名称</th><th>规格</th><th>操作</th></tr></thead><tbody>{boundProducts.length > 0 ? boundProducts.map((item) => <tr key={item.id}><td>{item.code}</td><td>{item.name}</td><td>{item.spec}</td><td><button type="button" onClick={() => setBoundProductIds((current) => current.filter((id) => id !== item.id))}>移除</button></td></tr>) : <tr><td className="pc-mini-empty" colSpan="4">暂无绑定商品，请点击“添加商品”选择</td></tr>}</tbody></table>
          <label><span className="pc-field-label">状态 <i>*</i></span><span className="pc-radios"><b><input type="radio" name="reason-status" defaultChecked />启用</b><b><input type="radio" name="reason-status" />停用</b></span></label>
          <div className="pc-inline-tip"><Info size={16} />商品白名单不会跳过停止要货、停售、配送日及订购属性校验。</div>
        </div> : <div className="pc-drawer-body">
          <label><span className="pc-field-label">二级组织 <i>*</i></span><button className="pc-select-wide" type="button">{drawer.record?.org || '华北事业部'}<ChevronDown size={15} /></button></label>
          <label><span className="pc-field-label">补发原因 <i>*</i></span><button className="pc-select-wide" type="button">{drawer.record?.reason || '物料破损补发'}<ChevronDown size={15} /></button></label>
          <label><span className="pc-field-label">审批方式 <i>*</i></span><span className="pc-radios"><b><input type="radio" name="approval-method" checked={approvalMethod === '审批模板'} onChange={() => setApprovalMethod('审批模板')} />审批模板</b><b><input type="radio" name="approval-method" checked={approvalMethod === '无需审批'} onChange={() => setApprovalMethod('无需审批')} />无需审批</b></span></label>
          {approvalMethod === '审批模板' && <label><span className="pc-field-label">审批模板 <i>*</i></span><button className="pc-select-wide" type="button">{drawer.record?.template || '品牌物料补发审批-华北'}<ChevronDown size={15} /></button></label>}
          <label><span className="pc-field-label">生效时间</span><input type="datetime-local" defaultValue="2026-08-09T00:00" /></label>
          <label><span className="pc-field-label">失效时间</span><input type="datetime-local" /></label>
          <label><span className="pc-field-label">状态 <i>*</i></span><span className="pc-radios"><b><input type="radio" name="approval-status" defaultChecked />启用</b><b><input type="radio" name="approval-status" />停用</b></span></label>
          <div className="pc-inline-tip warning"><AlertTriangle size={16} />相同二级组织与原因的有效期不得重叠；配置仅影响新提交申请。</div>
        </div>}
        <footer><button type="button" onClick={closeDrawer}>取消</button><button type="button" className="pc-primary" onClick={saveDrawer}>保存</button></footer>
      </aside></div>}
      {productPickerOpen && <div className="pc-product-picker-mask">
        <section className="pc-product-picker" role="dialog" aria-modal="true" aria-labelledby="pc-product-picker-title">
          <header><div><h2 id="pc-product-picker-title">选择商品</h2><p>选择需要绑定到当前补发原因的商品</p></div><button type="button" aria-label="关闭" onClick={() => setProductPickerOpen(false)}><X size={21} /></button></header>
          <div className="pc-product-picker-body">
            <div className="pc-product-scope"><Info size={16} /><span>可选范围：当前用户商品权限内全部商品；此处不按补发原因、门店或配送规则过滤。</span></div>
            <div className="pc-product-filters">
              <label><span>商品编码/名称/条码</span><input value={productKeyword} onChange={(event) => setProductKeyword(event.target.value)} placeholder="请输入商品编码、名称或条码" /></label>
              <label><span>商品分类</span><select value={productCategory} onChange={(event) => setProductCategory(event.target.value)}><option>全部分类</option>{[...new Set(pcPermissionProducts.map((item) => item.category))].map((item) => <option key={item}>{item}</option>)}</select></label>
              <label><span>商品部门</span><select value={productDepartment} onChange={(event) => setProductDepartment(event.target.value)}><option>全部部门</option>{[...new Set(pcPermissionProducts.map((item) => item.department))].map((item) => <option key={item}>{item}</option>)}</select></label>
              <div className="pc-product-filter-actions"><button className="pc-primary" type="button"><Search size={15} />查询</button><button type="button" onClick={() => { setProductKeyword(''); setProductCategory('全部分类'); setProductDepartment('全部部门'); }}><RotateCcw size={15} />重置</button></div>
            </div>
            <div className="pc-product-table-wrap"><table className="pc-product-table">
              <thead><tr><th><input type="checkbox" aria-label="全选当前查询结果" checked={allFilteredProductsSelected} onChange={toggleAllFilteredProducts} /></th><th>商品编码</th><th>商品条码</th><th>商品名称</th><th>商品分类</th><th>商品部门</th><th>规格</th><th>状态</th></tr></thead>
              <tbody>{filteredPermissionProducts.length > 0 ? filteredPermissionProducts.map((item) => {
                const selected = draftProductIds.includes(item.id);
                return <tr key={item.id} className={selected ? 'selected' : ''} onClick={() => toggleDraftProduct(item.id)}><td><input type="checkbox" aria-label={`选择${item.name}`} checked={selected} onClick={(event) => event.stopPropagation()} onChange={() => toggleDraftProduct(item.id)} /></td><td>{item.code}</td><td>{item.barcode}</td><td>{item.name}</td><td>{item.category}</td><td>{item.department}</td><td>{item.spec}</td><td><span className="pc-product-enabled">{item.status}</span></td></tr>;
              }) : <tr><td colSpan="8"><div className="pc-product-empty"><Search size={28} /><p>未找到符合条件的商品</p><span>请调整关键词或筛选条件后重试</span></div></td></tr>}</tbody>
            </table></div>
            <div className="pc-product-pagination"><span>共 {filteredPermissionProducts.length} 条</span><button type="button">1</button><span>20 条/页</span></div>
          </div>
          <footer><span>已选 <b>{draftProductIds.length}</b> 个商品</span><button type="button" onClick={() => setProductPickerOpen(false)}>取消</button><button type="button" className="pc-primary" onClick={confirmProductPicker}>确定</button></footer>
        </section>
      </div>}
      {changeLogOpen && <div className="pc-change-log-mask" onClick={() => setChangeLogOpen(false)}>
        <section className="pc-change-log-modal" role="dialog" aria-modal="true" aria-labelledby="pc-change-log-title" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => { if (event.key === 'Escape') setChangeLogOpen(false); }}>
          <header><h2 id="pc-change-log-title">修改记录</h2><button className="pc-change-log-close" type="button" onClick={() => setChangeLogOpen(false)}>关闭</button></header>
          <div className="pc-change-log-area"><div className="pc-change-log-scroll"><table className="pc-change-log-table">
            <colgroup><col className="pc-log-sequence" /><col className="pc-log-time" /><col className="pc-log-user" /><col /></colgroup>
            <thead><tr><th>序号</th><th>修改时间</th><th>修改人</th><th>操作明细</th></tr></thead>
            <tbody>{changeLogRecords.map((record, index) => {
              const expanded = expandedChangeRows.includes(index);
              return <tr key={`${record.time}-${index}`}><td>{index + 1}</td><td>{record.time}</td><td>{record.user}</td><td className={`pc-change-detail ${expanded ? 'expanded' : ''}`}><div><span>{record.detail}</span><b><button type="button" aria-expanded={expanded} onClick={() => setExpandedChangeRows((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])}>{expanded ? '收起' : '展开'}</button><button type="button" onClick={() => copyChangeDetail(record.detail, index)}>{copiedChangeRow === index ? '已复制' : '复制'}</button></b></div></td></tr>;
            })}</tbody>
          </table></div></div>
          <footer><span>共{changeLogRecords.length}条</span><span>‹</span><b>1</b><span>›</span></footer>
        </section>
      </div>}
      {pcToast && <div className="pc-toast"><CircleCheck size={17} />{pcToast}</div>}
    </main>
  );
}

function MobileApp() {
  const [reason, setReason] = useState('物料破损补发');
  const [reasonOpen, setReasonOpen] = useState(false);
  const [items, setItems] = useState([
    { ...reasonProducts['物料破损补发'][0], qty: 1, proof: true },
  ]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerKeyword, setPickerKeyword] = useState('');
  const [pickerSelectedIds, setPickerSelectedIds] = useState([]);
  const [notice, setNotice] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableItems = reasonProducts[reason];
  const filteredAvailableItems = useMemo(() => {
    const keyword = pickerKeyword.trim().toLowerCase();
    if (!keyword) return availableItems;
    return availableItems.filter((item) => `${item.code} ${item.name} ${item.barcode}`.toLowerCase().includes(keyword));
  }, [availableItems, pickerKeyword]);
  const totalQty = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

  const changeReason = (nextReason) => {
    setReason(nextReason);
    setItems([]);
    setReasonOpen(false);
    setNotice('补发原因已切换，请重新选择该原因允许补发的物料。');
  };

  const updateItem = (id, patch) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const openPicker = () => {
    setPickerKeyword('');
    setPickerSelectedIds(items.map((item) => item.id));
    setPickerOpen(true);
  };
  const togglePickerItem = (id) => {
    setPickerSelectedIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  };
  const confirmPicker = () => {
    setItems((current) => availableItems
      .filter((item) => pickerSelectedIds.includes(item.id))
      .map((item) => {
        const existing = current.find((value) => value.id === item.id);
        return existing ? { ...item, qty: existing.qty, proof: existing.proof } : { ...item, qty: 1, proof: false };
      }));
    setNotice('');
    setPickerOpen(false);
  };
  const submit = () => {
    if (!items.length) return setNotice('请至少选择一项补发物料。');
    if (items.some((item) => !item.proof)) return setNotice('请为每项物料补充破损图片后再提交。');
    setNotice('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="app-shell success-shell">
        <header className="page-header compact"><button type="button" aria-label="返回"><ArrowLeft size={21} /></button><h1>提交成功</h1><span /></header>
        <section className="success-card">
          <div className="success-icon"><CircleCheck size={33} /></div>
          <h2>补发申请已提交</h2>
          <p>申请单号：BF202608070018</p>
        </section>
        <section className="timeline-card">
          <h3>申请进度</h3>
          <div className="timeline-item active"><span /><div><b>待审批</b><p>已按华东事业部 · 物料破损补发，发起审批流程</p></div></div>
          <div className="timeline-item"><span /><div><b>生成仓配订单</b><p>审批通过后将按最新配送日与订购属性校验，生成 0 元审核态仓配门店订单</p></div></div>
          <div className="timeline-item"><span /><div><b>仓库履约</b><p>仓库收单、出库及配送状态将自动回写</p></div></div>
        </section>
        <div className="bottom-actions"><button className="secondary-action" type="button" onClick={() => setSubmitted(false)}>继续申请</button><button className="primary-action" type="button">查看申请详情</button></div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="page-header"><button type="button" aria-label="返回"><ArrowLeft size={25} /></button><h1>新增品牌物料补发申请</h1><span className="header-space" /></header>
      <div className="scroll-content">
        <section className="info-banner"><Info size={20} /><span>仅用于已到店且发生破损的物料补发申请。</span></section>
        <section className="form-section">
          <h2>申请信息</h2>
          <div className="field-row"><label>申请门店 <i>*</i></label><div className="field-value"><span>华东事业部 · 星河路店</span><ChevronDown size={17} /></div></div>
          <div className="field-row select-row"><label>补发原因 <i>*</i></label><button type="button" className="field-value reason-select" onClick={() => setReasonOpen(!reasonOpen)}><span>{reason}</span><ChevronDown size={17} /></button></div>
          {reasonOpen && <div className="choice-menu">{Object.keys(reasonProducts).map((option) => <button key={option} type="button" className={option === reason ? 'selected' : ''} onClick={() => changeReason(option)}>{option}<span>{option === reason && <CircleCheck size={16} />}</span></button>)}</div>}
          <div className="field-row"><label>期望送达日期</label><div className="field-value"><CalendarDays size={17} /><span>2026-08-10（周一）</span><ChevronDown size={17} /></div></div>
        </section>

        <section className="form-section materials-section">
          <div className="section-title"><h2>补发物料 <em>*</em></h2><span>{items.length} 项 / {totalQty} 件</span></div>
          <div className="rule-tip"><Info size={16} /><p>仅可选择当前补发原因允许的物料；提交及出单时均会校验停止要货、配送日和订购属性。</p></div>
          {items.length === 0 && <div className="empty-state"><PackagePlus size={25} /><p>尚未选择补发物料</p></div>}
          {items.map((item) => (
            <article className="material-card" key={item.id}>
              <div className="material-top"><div><b>{item.name}</b><p>{item.spec} · {item.code}</p></div><button type="button" className="remove-button" aria-label="删除物料" onClick={() => setItems((current) => current.filter((value) => value.id !== item.id))}><X size={17} /></button></div>
              <div className="material-control"><span>申请数量</span><QuantityControl value={item.qty} max={item.limit} onChange={(qty) => updateItem(item.id, { qty })} /></div>
              <div className="material-control proof-row"><span>破损凭证 <i>*</i></span>{item.proof ? <button type="button" className="proof-ready" onClick={() => updateItem(item.id, { proof: false })}><FileImage size={17} /><span>破损图片_01.jpg</span><CircleCheck size={17} /></button> : <button type="button" className="upload-button" onClick={() => updateItem(item.id, { proof: true })}><Plus size={17} />上传图片</button>}</div>
              <p className="limit-note">按当前门店订购属性，本次最多可申请 {item.limit} 件</p>
            </article>
          ))}
          <button type="button" className="add-material" onClick={openPicker}><Plus size={18} />添加补发物料</button>
        </section>
        <section className="notice-panel"><ShieldCheck size={19} /><p>审核通过后，系统将生成业务来源为“品牌物料补发”的 0 元仓配门店订单。若审批期间配送日或订购属性发生变化，将提示处理，不会静默减少数量。</p></section>
      </div>
      {notice && <div className="toast" role="status">{notice}</div>}
      <footer className="bottom-bar"><button type="button" className="draft-button">保存草稿</button><button type="button" className="submit-button" onClick={submit}>提交审批</button></footer>
      {pickerOpen && <div className="modal-mask"><section className="picker-sheet" role="dialog" aria-modal="true" aria-label="选择补发物料">
        <div className="sheet-handle" />
        <div className="picker-head"><h2>选择补发物料</h2><button type="button" aria-label="关闭" onClick={() => setPickerOpen(false)}><X size={21} /></button></div>
        <p className="picker-help">已按“{reason}”过滤可补发商品</p>
        <label className="picker-search"><Search size={17} /><input autoFocus value={pickerKeyword} onChange={(event) => setPickerKeyword(event.target.value)} placeholder="搜索商品编码 / 名称 / 条码" />{pickerKeyword && <button type="button" aria-label="清空搜索" onClick={() => setPickerKeyword('')}><X size={16} /></button>}</label>
        <div className="picker-list">{filteredAvailableItems.map((item) => {
          const selected = pickerSelectedIds.includes(item.id);
          return <button type="button" className={selected ? 'selected' : ''} key={item.id} aria-pressed={selected} onClick={() => togglePickerItem(item.id)}>
            <img src={item.image} alt="" />
            <span className="picker-product"><b>{item.name}</b><small>{item.spec}</small><small>{item.code}</small></span>
            <span className="picker-check" aria-hidden="true">{selected && <CircleCheck size={20} />}</span>
          </button>;
        })}{filteredAvailableItems.length === 0 && <div className="picker-empty"><Search size={25} /><p>未找到匹配商品</p><span>请尝试其他商品编码、名称或条码</span></div>}</div>
        <footer className="picker-footer"><span>已选 <b>{pickerSelectedIds.length}</b> 项</span><button type="button" className="picker-cancel" onClick={() => setPickerOpen(false)}>取消</button><button type="button" className="picker-confirm" onClick={confirmPicker}>确定</button></footer>
      </section></div>}
    </main>
  );
}

export function App() {
  const view = new URLSearchParams(window.location.search).get('view');
  return view === 'pc' ? <PcConfig /> : <MobileApp />;
}
