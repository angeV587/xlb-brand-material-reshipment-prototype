import { useState } from 'react';
import {
  Boxes,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Copy,
  Download,
  Edit3,
  Grid2X2,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Truck,
  Upload,
  X,
} from 'lucide-react';
import './pc-909-additions.css';

const ORDER_ROWS = [
  { id: 'DD100199001060005068', type: '普通仓配', store: 'DF加盟', amount: '1,079.10', qty: '1.000', status: '审核', creator: '马正安', created: '08-27 22:50:36', reshipNo: 'BF202608150026' },
  { id: 'DD100199001060005067', type: '仓配-补发申请', store: '星河路店', amount: '0.00', qty: '3.000', status: '审核', creator: '王小安', created: '08-27 22:41:18', reshipNo: 'BF202608150026' },
  { id: 'DD10011019980004263', type: '仓配-缺货订购', store: '测试门店加盟', amount: '1,000.00', qty: '1000.000', status: '审核', creator: '张浩杰', created: '08-27 18:29:15', reshipNo: '' },
  { id: 'DD10011019980004260', type: '普通仓配', store: '测试门店加盟', amount: '415.18', qty: '20.000', status: '审核', creator: '17838190191', created: '08-27 15:12:46', reshipNo: '' },
];

const TYPE_OPTIONS = ['门店预订', '备货订单', '含代销仓配单', '越库', '智能补货', '补发申请'];

function ErpFrame({ children }) {
  return (
    <main className="paf-app x909-app">
      <header className="paf-topbar">
        <b>新零帮</b>
        <button type="button"><Grid2X2 size={17} />应用</button>
        <div><Search size={17} />搜索菜单、单据、商品</div>
        <span />
        <em>南京众丞 · 管理中心</em>
        <i>王小安</i>
      </header>
      <div className="paf-workspace">
        <aside>
          <strong>ERP连锁管理</strong>
          <button type="button"><ClipboardList size={18} />看板</button>
          <button type="button" className="active"><Truck size={18} />配送<ChevronRight size={15} /></button>
          <section>
            <span>业务操作</span>
            <b>门店订单</b>
            <span>业务设置</span>
            <span>配送参数</span>
          </section>
          <button type="button"><Boxes size={18} />采购</button>
        </aside>
        <section className="paf-main">
          <nav className="paf-tabs">
            <button type="button">ERP看板</button>
            <button type="button">配送组织设置</button>
            <button type="button" className="active">门店订单 <X size={14} /></button>
            <button type="button">门店配送价</button>
            <button type="button">仓管理</button>
          </nav>
          {children}
        </section>
      </div>
    </main>
  );
}

function OrderToolbar() {
  return (
    <section className="x909-toolbar" aria-label="门店订单操作区">
      <button type="button"><Search size={15} />查询</button>
      <button type="button"><Trash2 size={15} />删除</button>
      <button type="button"><Plus size={16} />新增</button>
      <button type="button"><Download size={15} />导出<ChevronDown size={13} /></button>
      <button type="button"><Copy size={15} />复制</button>
      <button type="button">批量制单<ChevronDown size={13} /></button>
      <button type="button"><Upload size={15} />批量导入<ChevronDown size={13} /></button>
      <button type="button">批量审核</button>
      <button type="button">批量作废</button>
      <button type="button">多单合并</button>
      <button type="button"><Edit3 size={15} />缺货品生成门店订单</button>
    </section>
  );
}

function TypeCascader({ open, onToggle, onSelect }) {
  return (
    <div className="x909-type-field">
      <button type="button" aria-expanded={open} onClick={onToggle}><span>仓配单</span><ChevronDown size={14} /></button>
      {open && <div className="x909-cascader" role="dialog" aria-label="选择单据类型">
        <div className="x909-cascader-root">
          <button type="button" className="active">仓配单<ChevronRight size={14} /></button>
          <button type="button">直供单<ChevronRight size={14} /></button>
        </div>
        <div className="x909-cascader-children">
          {TYPE_OPTIONS.map((item) => <button type="button" key={item} className={item === '补发申请' ? 'new-type' : ''} onClick={() => onSelect(item)}>{item}</button>)}
        </div>
      </div>}
    </div>
  );
}

function OrderFilters({ mode, typeMenuOpen, onTypeMenu, selectedType, onSelectType, onQuery, onReset }) {
  return (
    <section className="x909-filters" aria-label="门店订单查询条件">
      <label><span>时间类型：</span><button type="button">制单时间<ChevronDown size={14} /></button></label>
      <label className="x909-date"><span>日期范围：</span><div><b>日</b><input value="2026-08-27" readOnly /><i>至</i><input value="2026-08-27" readOnly /></div></label>
      <label><span>单据状态：</span><button type="button">全部<ChevronDown size={14} /></button></label>
      <label><span>单据号：</span><input /></label>
      <label className="x909-type-label"><span>单据类型：</span>{mode === 'type' ? <TypeCascader open={typeMenuOpen} onToggle={onTypeMenu} onSelect={onSelectType} /> : <button type="button">{selectedType || '全部'}<ChevronDown size={14} /></button>}</label>
      <label><span>配送类型：</span><button type="button">全部<ChevronDown size={14} /></button></label>
      <label><span>关联单号：</span><input /></label>
      <label><span>收货门店：</span><button type="button">请选择<Search size={14} /></button></label>
      <label><span>发货组织：</span><input /></label>
      <label><span>发货仓库：</span><button type="button">请选择<ChevronDown size={14} /></button></label>
      <div className="x909-filter-actions"><button type="button" className="primary" onClick={onQuery}><Search size={15} />查询</button><button type="button" onClick={onReset}><RotateCcw size={15} />重置</button></div>
    </section>
  );
}

function RelatedCard({ kind, number, color, onOpen }) {
  return (
    <button type="button" className="x909-related-card" onClick={onOpen}>
      <strong style={{ backgroundColor: color }}>{number}<ChevronRight size={17} /></strong>
      <span>{kind === '补发申请' ? '审批：李木子' : '审核：王小安'}</span>
      <small>{kind === '补发申请' ? '08-15 15:36:18' : '08-27 22:50:40'}</small>
    </button>
  );
}

function RelatedBusinessModal({ onClose, onOpenReship }) {
  const lanes = [
    { name: '门店预订单' },
    { name: '补发申请', card: <RelatedCard kind="补发申请" number="BF202608150026" color="#416be7" onOpen={onOpenReship} /> },
    { name: '门店统配单' },
    { name: '关联门店订单' },
    { name: '门店订单', card: <RelatedCard kind="门店订单" number="DD100199001060005068" color="#24b44a" /> },
    { name: '门店补货单', card: <RelatedCard kind="门店补货单" number="YH100199001060001518" color="#416be7" /> },
  ];
  return (
    <div className="x909-modal-mask" role="presentation">
      <section className="x909-related-modal" role="dialog" aria-modal="true" aria-labelledby="related-title">
        <header><h2 id="related-title">关联业务</h2><button type="button" aria-label="关闭关联业务" onClick={onClose}><X size={20} /></button></header>
        <div className="x909-lane-scroll">
          <div className="x909-related-lanes">
            {lanes.map((lane) => <article key={lane.name} className={lane.name === '补发申请' ? 'highlight' : ''}><h3>{lane.name}</h3>{lane.card}</article>)}
          </div>
        </div>
      </section>
    </div>
  );
}

function OrderTable({ rows, onRelated }) {
  return (
    <div className="x909-table-wrap">
      <table>
        <thead><tr><th><input type="checkbox" /></th><th>序号</th><th>单据号</th><th>单据类型</th><th>收货门店</th><th>单据金额（含税）</th><th>数量</th><th>单据状态</th><th>制单人</th><th>制单时间</th><th>关联业务</th><th>创建渠道</th></tr></thead>
        <tbody>{rows.map((row, index) => <tr key={row.id} className={index === 0 ? 'selected' : ''}><td><input type="checkbox" defaultChecked={index === 0} /></td><td>{index + 1}</td><td><button type="button" className="link">{row.id}</button></td><td>{row.type}</td><td>{row.store}</td><td>{row.amount}</td><td>{row.qty}</td><td>{row.status}</td><td>{row.creator}</td><td>{row.created}</td><td><button type="button" className="link" onClick={() => onRelated(row)}>查看</button></td><td>门店订单PC</td></tr>)}</tbody>
        <tfoot><tr><td colSpan="5">合计</td><td>2,494.28</td><td>1024.000</td><td colSpan="5" /></tr></tfoot>
      </table>
    </div>
  );
}

function OrderPage({ mode }) {
  const [relatedOpen, setRelatedOpen] = useState(mode === 'related');
  const [typeMenuOpen, setTypeMenuOpen] = useState(mode === 'type');
  const [selectedType, setSelectedType] = useState('');
  const [appliedType, setAppliedType] = useState('');
  const [toast, setToast] = useState('');
  const filtered = appliedType === '补发申请' ? ORDER_ROWS.filter((item) => item.type === '仓配-补发申请') : ORDER_ROWS;
  const selectType = (item) => {
    setSelectedType(item);
    setTypeMenuOpen(false);
  };
  const reset = () => {
    setSelectedType('');
    setAppliedType('');
    setTypeMenuOpen(mode === 'type');
  };
  return (
    <ErpFrame>
      <div className="x909-page">
        <OrderToolbar />
        <OrderFilters mode={mode} typeMenuOpen={typeMenuOpen} onTypeMenu={() => setTypeMenuOpen((value) => !value)} selectedType={selectedType} onSelectType={selectType} onQuery={() => setAppliedType(selectedType)} onReset={reset} />
        <OrderTable rows={filtered} onRelated={() => setRelatedOpen(true)} />
        <footer className="x909-pagination"><span>已选中 1 条</span><i /><span>共{filtered.length}条</span><button type="button">1</button><span>200 条/页</span></footer>
      </div>
      {relatedOpen && <RelatedBusinessModal onClose={() => setRelatedOpen(false)} onOpenReship={() => { setToast('已打开补发申请 BF202608150026'); window.setTimeout(() => setToast(''), 2200); }} />}
      {toast && <div className="paf-toast"><CheckCircle2 size={16} />{toast}</div>}
    </ErpFrame>
  );
}

export function PcOrderRelatedView() {
  return <OrderPage mode="related" />;
}

export function PcOrderTypeView() {
  return <OrderPage mode="type" />;
}
