import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  ClipboardList,
  FileImage,
  Info,
  MapPin,
  Minus,
  PackagePlus,
  Plus,
  ShieldCheck,
  X,
} from 'lucide-react';

const reasonProducts = {
  '物料破损补发': [
    { id: 'card', name: '会员权益卡（新版）', spec: '100 张 / 包', code: 'SP-202608-001', limit: 2 },
    { id: 'stand', name: '会员活动立牌', spec: 'A4 / 亚克力', code: 'SP-202608-016', limit: 4 },
    { id: 'poster', name: '会员活动海报', spec: 'A3 / 20 张', code: 'SP-202608-021', limit: 2 },
  ],
  '新店开业补发': [
    { id: 'card', name: '会员权益卡（新版）', spec: '100 张 / 包', code: 'SP-202608-001', limit: 5 },
    { id: 'stand', name: '会员活动立牌', spec: 'A4 / 亚克力', code: 'SP-202608-016', limit: 8 },
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

export function App() {
  const [reason, setReason] = useState('物料破损补发');
  const [reasonOpen, setReasonOpen] = useState(false);
  const [items, setItems] = useState([
    { ...reasonProducts['物料破损补发'][0], qty: 1, proof: true },
  ]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableItems = reasonProducts[reason];
  const totalQty = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

  const changeReason = (nextReason) => {
    setReason(nextReason);
    setItems([]);
    setReasonOpen(false);
    setNotice('补发原因已切换，请重新选择该原因允许补发的物料。');
  };

  const updateItem = (id, patch) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const addItem = (item) => {
    if (!items.some((current) => current.id === item.id)) setItems((current) => [...current, { ...item, qty: 1, proof: false }]);
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
          <button type="button" className="add-material" onClick={() => setPickerOpen(true)}><Plus size={18} />添加补发物料</button>
        </section>
        <section className="notice-panel"><ShieldCheck size={19} /><p>审核通过后，系统将生成业务来源为“品牌物料补发”的 0 元仓配门店订单。若审批期间配送日或订购属性发生变化，将提示处理，不会静默减少数量。</p></section>
      </div>
      {notice && <div className="toast" role="status">{notice}</div>}
      <footer className="bottom-bar"><button type="button" className="draft-button">保存草稿</button><button type="button" className="submit-button" onClick={submit}>提交审批</button></footer>
      {pickerOpen && <div className="modal-mask"><section className="picker-sheet"><div className="sheet-handle" /><div className="picker-head"><h2>选择补发物料</h2><button type="button" aria-label="关闭" onClick={() => setPickerOpen(false)}><X size={21} /></button></div><p className="picker-help">已按“{reason}”过滤可补发商品</p><div className="picker-list">{availableItems.map((item) => <button type="button" key={item.id} disabled={items.some((current) => current.id === item.id)} onClick={() => addItem(item)}><span><b>{item.name}</b><small>{item.spec}</small></span>{items.some((current) => current.id === item.id) ? <i>已添加</i> : <Plus size={19} />}</button>)}</div></section></div>}
    </main>
  );
}
