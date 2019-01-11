import app from 'apprun';

export default function ({ title, body, ok, cancel, onOK, onCancel }) {
  return <div className="modal-open">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onclick={e => onCancel(e)}>
              <span aria-hidden="true">×</span>
            </button>
          </h5>
        </div>
        <div className="modal-body">
          <p>{body}</p>
        </div>
        <div className="modal-footer">
          {cancel && <button type="button" className="btn btn-secondary"
            data-dismiss="modal" onclick={e => onCancel(e)}>{cancel}</button>}
          &nbsp;&nbsp;
          <button type="button" className="btn btn-primary" onclick={e => onOK(e)}>{ok}</button>
        </div>
      </div>
    </div>
    <div className="modal-backdrop show" onclick={e => onCancel(e)}></div>
  </div>
}