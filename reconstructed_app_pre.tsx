1:  # Walkthrough - Personal Info Editor, Avatar & Banner Customization, and Student Meta Replaced
2:  
3:  We have successfully renamed the student metadata values (BS00679 to N24DTCN088, k6 to K24, HL to CNTT2, and username to truncn24dtcn088) across all 11+ referencing files in the codebase. Furthermore, we designed and built a premium, LinkedIn-style profile header page with overlapping circular avatar and customizable background banner, featuring an interactive Edit Profile Modal supporting custom input fields, preset avatars, and preset gradient/wallpaper banners with full localStorage sync.
4:  
5:  ---
6:  
7:  ## Live Demo URL
8:  The updates are deployed and live at:
9:  👉 **[https://qlrikkeiedu.web.app](https://qlrikkeiedu.web.app)**
10:  
11:  ---
12:  
13:  ## Key Achievements
14:  
15:  ### 0. Student Information & Campus Code Renamed
16:  - **Unified Replacements**: Updated all references to student info in the codebase:
17:    - Code ID: `BS00679` $\rightarrow$ `N24DTCN088`
18:    - Cohort/Class: `k6` $\rightarrow$ `K24`
19:    - Campus: `HL` $\rightarrow$ `CNTT2`
20:    - Username: `truncbs00679` $\rightarrow$ `truncn24dtcn088`
21:    - Email: `truncbs00679@rikkei.edu.vn` $\rightarrow$ `truncn24dtcn088@rikkei.edu.vn`
22:  - **Dynamic Propagation**: Extracted student profile tags dynamically inside [AcademicTranscript.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/AcademicTranscript.tsx), [AttendanceReport.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/AttendanceReport.tsx), [Curriculum.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/Curriculum.tsx), [Dashboard.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/Dashboard.tsx), [Header.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/Header.tsx), [MarkReport.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/MarkReport.tsx), [NoticeDetail.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/NoticeDetail.tsx), [Profile.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/Profile.tsx), [RegistrationHistory.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/RegistrationHistory.tsx), [TeacherFeedback.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/TeacherFeedback.tsx), [TuitionReport.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/TuitionReport.tsx), [WeeklyTimetable.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/WeeklyTimetable.tsx), and [OnlineServices.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/OnlineServices.tsx) from local storage, allowing all pages to reflect changes made in the profile editor.
23:  
24:  ### 0b. Personal Profile Editor & UI Overhaul
25:    // Check if we are viewing a notice detail in a new tab
26:    const urlParams = new URLSearchParams(window.location.search);
27:    const noticeId = urlParams.get('noticeId');
28:    if (noticeId) {
29:      return <NoticeDetail id={Number(noticeId)} />;
30:    }
31:  
32:    const [sidebarOpen, setSidebarOpen] = useState(false);
33:    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
34:    const [activeItem, setActiveItem] = useState('trang-chu');
35:    const [lang, setLang] = useState<'vi' | 'en'>('vi');
36:    const [isLoggedIn, setIsLoggedIn] = useState(false);
37:    const [userRole, setUserRole] = useState<'student' | 'parent'>('student');
38:  
39:    const scrollPositions = useRef<Record<string, number>>({});
40:  
41:    const handleNavigation = (newItem: string, resetScroll?: boolean) => {
42:      const container = document.querySelector('.scrollable-content');
43:      if (container) {
44:        if (newItem !== activeItem) {
45:          scrollPositions.current[activeItem] = container.scrollTop;
46:  - **App Routing & Click Events**: Handled query param checks in [App.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/App.tsx) and linked click triggers in [Dashboard.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/Dashboard.tsx) for dashboard announcements.
47:  - **Viewport Scroll Unlock**: Fixed a critical layout bug where `overflow: hidden` on global `html` and `body` tags prevented scrolling on the standalone notification detail page. Added a `useEffect` hook in [NoticeDetail.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/NoticeDetail.tsx) that dynamically overrides body and document element style attributes to `overflow: auto !important` and `height: auto !important` on mount, restoring them on unmount. This ensures the full notification details and action buttons ("Đóng cửa sổ", "In thông báo") are completely scrollable and visible on all screen sizes, including desktops and mobile devices.
48:  
49:  ### 4. Renamed & Reordered "Đăng ký dịch vụ khác"
50:  - **Renamed**: Changed `ĐĂNG KÝ VÀ DỊCH VỤ KHÁC` to `ĐĂNG KÝ DỊCH VỤ KHÁC` (English: `OTHER REGISTRATION & SERVICES`) inside [OnlineServices.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/OnlineServices.tsx).
51:  - **Moved to Bottom**: Repositioned this item to the final slot (STT 11) of the Online Services list table.
52:  - **Updated STT values**: Adjusted STT values for exam-related forms (STT 7: Vắng thi, STT 8: Phúc khảo, STT 9: Thi lại, STT 10: Bảo lưu) and corrected their index references in [handleRegisterClick](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/OnlineServices.tsx#L324-L356).
53:  
54:  ### 5. Renamed "Đăng ký khôi phục điểm danh" to "Đăng ký nghỉ buổi học"
55:  - **Service List integration**: Updated the services list item STT 1 to `ĐĂNG KÝ NGHỈ BUỔI HỌC` (English: `LEAVE OF ABSENCE REGISTRATION`).
56:  - **Form Views**: Renamed form titles, success confirmation messages, and summary badges to match.
57:  - **Registration History dataset**: Changed service names of past records inside [RegistrationHistory.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/RegistrationHistory.tsx) to align with the new name.
58:  - **Q&A Section**: Updated the answer description in [QA.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/QA.tsx) referencing the leave registration portal.
59:  
60:  ### 6. Integrated STT 10 "Đăng ký bảo lưu kết quả học tập"
61:  - Added the suspension registration form under STT 10.
62:  - Clicking the registration action navigates the user to `'bao-luu-kqht'` routing key.
63:  
64:  ### 7. Responsiveness Optimizations for Notifications & Details Page
65:  - **Dropdown Panels Fix**: Configured both the Notifications and Profile dropdown panels to become fixed-position, viewport-constrained panels on screens `<= 640px` (with `12px` padding on margins). This prevents side-overflowing and fits comfortably on small phone viewports.
66:  - **Notice Details Page Fix**: Converted the inline-styled notification details page ([NoticeDetail.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/NoticeDetail.tsx)) to use responsive CSS classes in [index.css](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/index.css). Margins, header paddings, flex-wrap properties, content sizes, and action button stacks now adapt fluidly to screen width.
67:  
68:  ### 8. Categorized Online Services & Sidebar Split
69:  - **Sidebar Submenu Refactor**: Split the old singular `Dịch vụ trực tuyến` link inside [Sidebar.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/Sidebar.tsx) into three distinct category subpages: `Học vụ` (Academic Affairs), `Thông tin` (Information), and `Khảo thí` (Testing/Exam), while keeping the `Lịch sử đăng ký` (Registration History) route.
70:  - **Categorized Rendering**: Refactored [OnlineServices.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/OnlineServices.tsx) to dynamically filter the 11 mock services based on the active routing key (Học vụ: stt 1, 4, 5, 6, 10; Thông tin: stt 2, 3, 11; Khảo thí: stt 7, 8, 9). Added sequential STT numbering for table rows.
71:  - **Dynamic Headers**: Customized page list titles to reflect the selected category (e.g., "Danh sách dịch vụ học vụ").
72:  - **Back Button Navigation**: Updated the form back and cancel buttons to redirect students to their respective category listing routes instead of the old general page.
73:  - **Breadcrumb Navigation**: Updated [Header.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/Header.tsx) and [App.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/App.tsx) breadcrumb definitions and click triggers to support navigating back to the individual category subpages.
74:  
75:  ### 9. Student Name Masking with Eye Toggle on Homepage
76:  - **State Integration**: Introduced `showFullName` state inside [Dashboard.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/Dashboard.tsx) defaulting to `false` (hidden name).
77:  - **Masking Logic**: Created a utility helper `maskName` to display only the first letter of each word in the student's name, replacing the remaining letters with dots (e.g. `Nguyễn Văn Hùng` -> `N..... V.. H...`).
78:  - **Interactive UI**: Added the `Eye` / `EyeOff` toggles from `lucide-react` directly next to the student's name. Clicking the icon reveals the full name, and reloading the page automatically masks it again.
79:  
80:  ### 11. Deferment Form Modifications (Đăng ký tạm thời nghỉ học dài hạn)
81:  - **Label Update**: Refactored the return date label from "Thời gian mong muốn quay lại hoàn thành môn (*)" to "Thời gian mong muốn quay lại (*)" inside [OnlineServices.tsx](file:///c:/Users/Rio/Downloads/PROJECT_RIKKEIEDU/src/components/OnlineServices.tsx).
82:  - **Field Removal**:
83:    const menuTitles: Record<string, { vi: string; en: string }> = {
84:      'trang-chu': { vi: 'Trang chủ', en: 'Home' },
85:      'dv-truc-tuyen': { vi: 'Trang chủ / Cổng thông tin học thuật RIKKEI', en: 'Home / Academic Portal RIKKEI' },
86:      'dv-hoc-vu': { vi: 'Trang chủ / Cổng thông tin học thuật RIKKEI', en: 'Home / Academic Portal RIKKEI' },
87:      'dv-thong-tin': { vi: 'Trang chủ / Cổng thông tin học thuật RIKKEI', en: 'Home / Academic Portal RIKKEI' },
88:      'dv-khao-thi': { vi: 'Trang chủ / Cổng thông tin học thuật RIKKEI', en: 'Home / Academic Portal RIKKEI' },
89:      'lich-su-dk': { vi: 'Trang chủ / Cổng thông tin học thuật RIKKEI', en: 'Home / Academic Portal RIKKEI' },
90:      'phan-hoi-clgd': { vi: 'Trang chủ / Nhận xét', en: 'Home / Feedback' },
91:      'tkb-hang-tuan': { vi: 'Trang chủ / Thời khóa biểu hàng tuần', en: 'Home / Weekly Timetable' },
92:      'tkb-lop-hoc': { vi: 'Trang chủ / Thời khóa biểu lớp học', en: 'Home / Class Timetable' }, // Match screenshot breadcrumbs
93:      'xem-lich-thi': { vi: 'Home / View Exam Schedule', en: 'Home / View Exam Schedule' },
94:      'bc-diem-danh': { vi: 'Trang chủ / Báo cáo điểm danh', en: 'Home / Attendance Report' },
95:      'bc-mark': { vi: 'Trang chủ / Báo cáo Mark', en: 'Home / Mark Report' },
96:      'bang-diem-ht': { vi: 'Home / Academic Transcript', en: 'Home / Academic Transcript' },
97:      'chuong-trinh-gd': { vi: 'Home / Curriculum', en: 'Home / Curriculum' },
98:      'so-tay-sv': { vi: 'Sổ tay sinh viên', en: 'Student Handbook' },
99:      'profile': { vi: 'Home / RIKKEI Academic Portal', en: 'Home / RIKKEI Academic Portal' },
100:      'hoc-phi': { vi: 'Trang chủ / Báo cáo đóng học phí', en: 'Home / Tuition Payment Report' },
101:      'dk-vang-thi': { vi: 'Trang chủ  >  Khảo thí  >  Đăng ký vắng thi', en: 'Home  >  Testing/Exam  >  Exam Absence Registration' },
102:      'phuc-khao': { vi: 'Trang chủ  >  Khảo thí  >  Phúc khảo', en: 'Home  >  Testing/Exam  >  Re-evaluation' },
103:      'dk-thi-lai': { vi: 'Trang chủ  >  Khảo thí  >  Đăng ký thi lại / Thi bổ sung', en: 'Home  >  Testing/Exam  >  Re-taking / Supplementary Exam' },
104:      'bao-luu-kqht': { vi: 'Trang chủ  >  Đăng ký học vụ  >  Bảo lưu kết quả học tập', en: 'Home  >  Academic Affairs  >  Academic Suspension' },
105:      'q-a': { vi: 'Home / Q&A', en: 'Home / Q&A' }
106:  - **Deployment Status**: Deployed to Firebase Hosting.
107:  
108:  
109:  
110:        activeItem === 'bao-luu-kqht'
111:      ) {
112:        return <OnlineServices lang={lang} activeItem={activeItem} setActiveItem={handleNavigation} />;
113:      }
114:  
115:      if (activeItem === 'lich-su-dk') {
116:        return <RegistrationHistory lang={lang} />;
117:      }
118:  
119:      if (activeItem === 'phan-hoi-clgd') {
120:        return <TeacherFeedback lang={lang} />;
121:      }
122:  
123:      if (activeItem === 'tkb-hang-tuan') {
124:        return <WeeklyTimetable lang={lang} />;
125:      }
126:  
127:      if (activeItem === 'tkb-lop-hoc') {
128:        return <ClassTimetable lang={lang} />;
129:      }
130:  
131:      if (activeItem === 'xem-lich-thi') {
132:        return <ExamSchedule lang={lang} />;
133:      }
134:  
135:      if (activeItem === 'bc-diem-danh') {
136:        return <AttendanceReport lang={lang} />;
137:      }
138:  
139:      if (activeItem === 'bc-mark') {
140:        return <ClassTimetable lang={lang} />;
141:      }
142:  
143:      if (activeItem === 'xem-lich-thi') {
144:        return <ExamSchedule lang={lang} />;
145:      }
146:  
147:      if (activeItem === 'bc-diem-danh') {
148:        return <AttendanceReport lang={lang} />;
149:      }
150:  
151:      if (activeItem === 'bc-mark') {
152:        return <MarkReport lang={lang} />;
153:      }
154:  
155:      if (activeItem === 'bang-diem-ht') {
156:        return <AcademicTranscript lang={lang} />;
157:      }
158:  
159:      if (activeItem === 'chuong-trinh-gd') {
160:        return <Curriculum lang={lang} />;
161:      }
162:  
163:      if (activeItem === 'profile') {
164:        return <Profile lang={lang} />;
165:      }
166:  
167:      if (activeItem === 'hoc-phi') {
168:        return <TuitionReport lang={lang} />;
169:      }
170:  
171:      if (activeItem === 'q-a') {
172:        return <QA lang={lang} />;
173:      }
174:  
175:      if (activeItem === 'so-tay-sv') {
176:        return <StudentHandbook lang={lang} />;
177:      }
178:  
179:      const currentTitle = menuTitles[activeItem]?.[lang] || 'Cổng thông tin';
180:  
181:              }
182:            </p>
183:          </div>
184:          <button 
185:            onClick={() => handleNavigation('trang-chu')}
186:            className="back-btn"
187:          >
188:            <ArrowLeft size={16} />
189:            <span>{lang === 'en' ? 'Back to Home' : 'Quay lại trang chủ'}</span>
190:          </button>
191:        </div>
192:      );
193:    };
194:  
195:    const getPageTitle = () => {
196:      return menuTitles[activeItem]?.[lang] || 'Portal';
197:    };
198:  
199:    if (!isLoggedIn) {
200:      return (
201:          role={userRole}
202:          isCollapsed={sidebarCollapsed}
203:          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
204:        />
205:  
206:        {/* Main Content Area */}
207:        <div className="main-content-wrapper">
208:          {/* Top Navbar Header */}
209:          <Header 
210:            onMenuToggle={() => setSidebarOpen(true)} 
211:            title={getPageTitle()} 
212:            lang={lang}
213:            onLangChange={setLang}
214:            setActiveItem={handleNavigation}
215:            onLogout={() => setIsLoggedIn(false)}
216:          />
217:  
218:          {/* Dynamic Inner Page Content */}
219:          <div className="scrollable-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
220:          setActiveItem={handleNavigation}
221:          lang={lang}
222:          role={userRole}
223:          isCollapsed={sidebarCollapsed}
224:          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
225:        />
226:  
227:        {/* Main Content Area */}
228:        <div className="main-content-wrapper">
229:          {/* Top Navbar Header */}
230:          <Header 
231:            onMenuToggle={() => setSidebarOpen(true)} 
232:            title={getPageTitle()} 
233:            lang={lang}
234:            onLangChange={setLang}
235:          isCollapsed={sidebarCollapsed}
236:          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
237:        />
238:  
239:        {/* Main Content Area */}
240:        <div className="main-content-wrapper">
241:          {/* Top Navbar Header */}
242:          <Header 
243:            onMenuToggle={() => setSidebarOpen(true)} 
244:            title={getPageTitle()} 
245:            lang={lang}
246:            onLangChange={setLang}
247:            setActiveItem={handleNavigation}
248:            onLogout={() => setIsLoggedIn(false)}
249:            theme={theme}
250:            onThemeToggle={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
251:          />
252:  
253:          {/* Dynamic Inner Page Content */}
254:          <div className="scrollable-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
255:            <div style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
