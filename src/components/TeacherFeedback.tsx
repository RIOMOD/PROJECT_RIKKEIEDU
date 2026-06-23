import { useState } from 'react';
import { MessageSquare, CheckCircle2 } from 'lucide-react';

interface FeedbackItem {
  groupName: string;
  startDate: string;
  teacher: string;
  topic: string;
  deadline: string;
  comment: string;
}

interface TeacherFeedbackProps {
  lang: 'vi' | 'en';
}

export const TeacherFeedback = ({ lang }: TeacherFeedbackProps) => {
  // Translation helper
  const t = (viText: string, enText: string) => {
    return lang === 'en' ? enText : viText;
  };

  // Initialize mock feedback list
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([
    {
      groupName: 'ENT102.14',
      startDate: '27/04/2023',
      teacher: 'HoangNNM',
      topic: 'ENT102.1 (Tiếng Anh 3 - Xuất sắc 2)',
      deadline: '',
      comment: t('Giảng viên nhiệt tình, bài giảng dễ hiểu, hỗ trợ sinh viên rất tốt.', 'Enthusiastic lecturer, easy-to-understand lectures, very supportive of students.')
    },
    {
      groupName: 'ENT102.14',
      startDate: '27/04/2023',
      teacher: 'NhuDQ4',
      topic: 'ENT102.1 (Tiếng Anh 3 - Xuất sắc 2)',
      deadline: '',
      comment: t('Phương pháp dạy học mới mẻ, cuốn hút.', 'New and engaging teaching methodology.')
    },
    {
      groupName: 'CF01.061',
      startDate: '26/11/2022',
      teacher: 'QuanLN4',
      topic: 'CF01 (Microsoft Office)',
      deadline: '',
      comment: t('Thầy hướng dẫn thực hành chi tiết, kỹ năng thực tế tốt.', 'Detailed hands-on guidance, great practical skills.')
    }
  ]);

  // Modal control states
  const [editTarget, setEditTarget] = useState<FeedbackItem | null>(null);
  const [editedComment, setEditedComment] = useState('');
  const [captureTarget, setCaptureTarget] = useState<FeedbackItem | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Rating scores for mock survey sliders
  const [criteria, setCriteria] = useState({
    preparation: 5,
    punctuality: 5,
    responsiveness: 5,
    pedagogy: 5
  });

  const handleEditClick = (item: FeedbackItem) => {
    setEditTarget(item);
    setEditedComment(item.comment);
    setCriteria({
      preparation: 5,
      punctuality: 5,
      responsiveness: 5,
      pedagogy: 5
    });
    setShowSuccess(false);
  };

  const handleSaveComment = () => {
    if (!editTarget) return;

    setFeedbackList(prev => prev.map(item => {
      if (item.teacher === editTarget.teacher && item.groupName === editTarget.groupName) {
        return { ...item, comment: editedComment };
      }
      return item;
    }));

    setSuccessMsg(t(`Cập nhật phản hồi cho giảng viên ${editTarget.teacher} thành công!`, `Feedback for lecturer ${editTarget.teacher} updated successfully!`));
    setShowSuccess(true);

    setTimeout(() => {
      setEditTarget(null);
      setShowSuccess(false);
    }, 1800);
  };

  const handleCaptureFeedback = (item: FeedbackItem) => {
    setCaptureTarget(item);
    setShowSuccess(true);
    setSuccessMsg(t(`Đã tạo liên kết chụp lại phản hồi giảng dạy lớp ${item.groupName} (${item.teacher}).`, `Generated capture link for teaching feedback of class ${item.groupName} (${item.teacher}).`));

    setTimeout(() => {
      setCaptureTarget(null);
      setShowSuccess(false);
    }, 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', animation: 'fadeIn 0.5s ease forwards' }}>
      
      {/* Main Container */}
      <main className="dashboard-container">
        
        {/* Title Heading */}
        <h2 className="services-section-title">
          {t('DANH SÁCH PHẢN HỒI CHO NGUYỄN VĂN HÙNG (BS00679)', 'FEEDBACK LIST FOR NGUYEN VAN HUNG (BS00679)')}
        </h2>

        {/* Feedback List Table */}
        <div className="feedback-table-wrapper">
          <table className="feedback-table">
            <thead className="feedback-thead">
              <tr>
                <th className="feedback-th">{t('TÊN NHÓM', 'GROUP NAME')}</th>
                <th className="feedback-th">{t('NGÀY BẮT ĐẦU', 'START DATE')}</th>
                <th className="feedback-th">{t('GIẢNG VIÊN', 'LECTURER')}</th>
                <th className="feedback-th">{t('CHỦ ĐỀ', 'TOPIC')}</th>
                <th className="feedback-th">{t('HẠN CHỐT', 'DEADLINE')}</th>
                <th className="feedback-th">{t('NHẬN PHẢN HỒI', 'ACTION')}</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((item, index) => (
                <tr key={index} className="feedback-tr">
                  {/* Tên nhóm */}
                  <td className="feedback-td feedback-td-center" style={{ fontWeight: '700' }}>
                    {item.groupName}
                  </td>
                  
                  {/* Ngày khai trương */}
                  <td className="feedback-td feedback-td-center font-mono">
                    {item.startDate}
                  </td>
                  
                  {/* Giảng viên */}
                  <td className="feedback-td feedback-td-center" style={{ fontWeight: '600' }}>
                    {item.teacher}
                  </td>
                  
                  {/* Chủ đề */}
                  <td className="feedback-td" style={{ color: '#334155' }}>
                    {item.topic}
                  </td>
                  
                  {/* Hạn chót */}
                  <td className="feedback-td feedback-td-center">
                    {item.deadline || <span style={{ color: '#CBD5E1' }}>—</span>}
                  </td>
                  
                  {/* Nhận phản hồi links */}
                  <td className="feedback-td feedback-td-center">
                    <span 
                      onClick={() => handleEditClick(item)}
                      className="feedback-link"
                    >
                      {t('Chỉnh sửa bình luận', 'Edit Comment')}
                    </span>
                    <span style={{ color: '#CBD5E1', margin: '0 8px' }}>|</span>
                    <span 
                      onClick={() => handleCaptureFeedback(item)}
                      className="feedback-link"
                    >
                      {t('Chụp lại', 'Capture')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

      {/* Comment Editor Survey Modal */}
      {editTarget && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            {!showSuccess ? (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#FFF7ED', color: 'var(--primary)' }}>
                  <MessageSquare size={26} />
                </div>
                <h3 className="modal-title">{t(`Phản hồi giảng viên ${editTarget.teacher}`, `Feedback for Lecturer ${editTarget.teacher}`)}</h3>
                <p className="modal-desc" style={{ marginBottom: '16px' }}>
                  {t('Lớp:', 'Class:')} <strong>{editTarget.groupName}</strong> | {t('Chủ đề:', 'Topic:')} {editTarget.topic}
                </p>

                {/* Survey Criteria Sliders */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', marginBottom: '16px' }}>
                  
                  {/* Criteria 1 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                      <span>{t('1. Giảng viên chuẩn bị bài đầy đủ:', '1. Lecturer is fully prepared:')}</span>
                      <span style={{ color: 'var(--primary)', marginLeft: 'auto' }}>{criteria.preparation}/5</span>
                    </div>
                    <input
                      type="range" min="1" max="5"
                      value={criteria.preparation}
                      onChange={(e) => setCriteria({ ...criteria, preparation: parseInt(e.target.value) })}
                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                    />
                  </div>

                  {/* Criteria 2 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                      <span>{t('2. Lên lớp đúng giờ, nghiêm túc:', '2. Punctuality and professionalism:')}</span>
                      <span style={{ color: 'var(--primary)', marginLeft: 'auto' }}>{criteria.punctuality}/5</span>
                    </div>
                    <input
                      type="range" min="1" max="5"
                      value={criteria.punctuality}
                      onChange={(e) => setCriteria({ ...criteria, punctuality: parseInt(e.target.value) })}
                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                    />
                  </div>

                  {/* Criteria 3 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                      <span>{t('3. Hỗ trợ giải đáp thắc mắc của sinh viên:', '3. Supports and answers student queries:')}</span>
                      <span style={{ color: 'var(--primary)', marginLeft: 'auto' }}>{criteria.responsiveness}/5</span>
                    </div>
                    <input
                      type="range" min="1" max="5"
                      value={criteria.responsiveness}
                      onChange={(e) => setCriteria({ ...criteria, responsiveness: parseInt(e.target.value) })}
                      style={{ width: '100%', accentColor: 'var(--primary)' }}
                    />
                  </div>

                </div>

                {/* Text feedback */}
                <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                  <label style={{ fontSize: '11.5px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    {t('Nhận xét chi tiết:', 'Detailed comment:')}
                  </label>
                  <textarea
                    rows={3}
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    placeholder={t('Nhập ý kiến đóng góp của bạn về chất lượng giảng dạy...', 'Enter your comments about the quality of teaching...')}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontSize: '12.5px',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <div className="modal-actions">
                  <button onClick={handleSaveComment} className="modal-btn-confirm">
                    {t('Lưu nhận xét', 'Save')}
                  </button>
                  <button onClick={() => setEditTarget(null)} className="modal-btn-cancel">
                    {t('Hủy bỏ', 'Cancel')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-icon" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="modal-title" style={{ color: '#065F46' }}>{t('Thành công!', 'Success!')}</h3>
                <p className="modal-desc" style={{ marginBottom: 0 }}>
                  {successMsg}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Capture Screenshot Modal */}
      {captureTarget && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
              <CheckCircle2 size={28} />
            </div>
            <h3 className="modal-title" style={{ color: '#065F46' }}>{t('Đã xác nhận chụp lại', 'Confirmed Capture')}</h3>
            <p className="modal-desc" style={{ marginBottom: 0 }}>
              {successMsg}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
