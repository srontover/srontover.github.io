(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = [...document.querySelectorAll(".nav-menu a")];
  const languageButtons = [...document.querySelectorAll(".lang-button")];
  const translatable = [...document.querySelectorAll("[data-i18n]")];
  const titleTranslatable = [...document.querySelectorAll("[data-i18n-title]")];
  const year = document.querySelector("#year");
  const backToTop = document.querySelector(".back-to-top");
  const english = Object.fromEntries(translatable.map((element) => [element.dataset.i18n, element.textContent.trim()]));

  const zh = {
    navAbout: "关于我", navInterests: "研究兴趣", navEducation: "教育背景", navExperience: "科研经历", navProjects: "项目", navWorks: "成果", navSkills: "技能", navAwards: "奖项", navContact: "联系",
    heroEyebrow: "学术作品集 | 机器人与人工智能",
    heroTitle: "人工智能专业本科生，关注让人形机器人学习可泛化的复杂身体技能。",
    heroText: "我目前在香港中文大学接受人形机器人学习方向的科研训练，同时独立通过基于仿真的强化学习研究步态与踢球。更广泛地关注移动操作、统一技能策略、运动先验、面向身体控制的感知，以及未来的仿真到真实研究。",
    cv: "科研简历", scholar: "Google Scholar（待补充）",
    snapshotTitle: "研究概览", snapshotAreaLabel: "主要方向", snapshotArea: "人形机器人的可泛化身体技能学习",
    snapshotFocusLabel: "当前工作", snapshotFocus: "统一策略、运动先验、T1 踢球与步态训练",
    snapshotEngineeringLabel: "工程经验", snapshotEngineering: "ABB RAPID 编程、机器人标定、三维传感",
    snapshotToolsLabel: "工具链", snapshotTools: "Python、C++、PyTorch、MuJoCo、MJLab、Warp、Git、Linux",
    aboutKicker: "关于我", aboutTitle: "让人形机器人学习可泛化的复杂身体技能。",
    aboutText1: "我就读于南京邮电大学人工智能专业，研究兴趣集中在人形机器人的可泛化身体技能学习，尤其关注动态全身行为、移动操作、强化学习、运动先验和接触丰富控制。",
    aboutText2: "我在香港中文大学围绕统一策略、运动先验和任务适应等人形机器人学习问题接受科研训练。独立项目中，我通过仿真研究步态与踢球策略，涵盖奖励塑形、课程学习、策略诊断和 Conditional AMP。手眼标定工作则让我接触到 ABB 机器人系统、三维传感、点云数据与实际标定约束。",
    interestsKicker: "研究兴趣", interestsTitle: "围绕可泛化身体技能的拓展研究路径。",
    interest1Title: "可泛化的人形技能学习", interest1Text: "学习能够适应不同目标、条件和任务变化的身体技能，而不是只解决单一固定行为。",
    interest2Title: "机器人强化学习", interest2Text: "面向机器人控制的任务设计、奖励塑形、课程学习、策略评估与诊断流程。",
    interest3Title: "移动操作与接触丰富技能", interest3Text: "结合身体移动、平衡、接触时机和物体交互，研究踢球与全身操作等动态技能。",
    interest4Title: "运动先验与模仿学习", interest4Text: "AMP 风格先验、人体运动数据、模仿学习与潜变量表征，用于获得自然且有效的机器人运动。",
    interest5Title: "面向身体控制的感知", interest5Text: "研究直接服务于技能执行的感知，包括物体状态、接触信息和面向控制的自中心观测。",
    interest6Title: "仿真到真实与学习动力学", interest6Text: "未来研究方向：关注建模误差、观测噪声、动作延迟、接触建模、学习动力学和硬件约束。",
    educationKicker: "教育背景", educationTitle: "南京邮电大学", educationDate: "2024 年 9 月至今", educationDegree: "人工智能专业工学学士在读", educationSchool: "南京邮电大学（NJUPT）",
    educationExpected: "预计毕业时间：2028 年", educationGpa: "GPA：4.08 / 5.0", educationRank: "人工智能专业排名：3 / 133",
    educationCoursework: "相关课程：机器学习、深度学习、人工智能导论、数据结构、线性代数、概率论与数理统计。",
    experienceKicker: "科研经历", experienceTitle: "在人形机器人学习中进行科研训练与问题形成。",
    experienceDate: "2026 年 9 月至今", experienceRemote: "远程", experienceRole: "人形机器人学习与运动先验研究",
    experienceAffiliation: "香港中文大学 | 科研实习生（远程）", experienceAdvisors: "指导：颜子轲博士（清华大学 AIR）、李钟毓助理教授（香港中文大学机械与自动化工程学系）。",
    experienceFocusLabel: "当前研究关注", experiencePoint1: "围绕人形机器人学习、全身控制、运动模仿和任务适应开展文献调研、论文汇报、研究问题提炼、方法讨论与实验规划。",
    experiencePoint2: "分析任务目标与运动先验之间的张力，包括固定跟踪、条件化放松和多目标优化思路。",
    experiencePoint3: "探索统一策略、非连续运动数据引起的技能衔接与 OOD 问题，以及不过度依赖关节级跟踪误差的动作引导方式。",
    projectsKicker: "研究 / 项目", projectsTitle: "从动态技能学习走向可泛化的人形身体技能。",
    tagHumanoidRl: "人形强化学习", tagLocomotion: "步态控制", tagReward: "奖励设计", tagConditionalAmp: "Conditional AMP", tagInProgress: "进行中", tagMotionPrior: "运动先验", tagImitation: "模仿学习",
    project1Title: "通过强化学习学习人形机器人的动态技能", project1Text: "使用 MuJoCo/MJLab/Warp 仿真流程，为 T1 人形机器人的步态与接触丰富踢球任务实现并修改强化学习环境。",
    problemGoal: "问题 / 目标", project1Goal: "构建连接步态稳定、接触时机、球体交互与目标导向控制的任务与训练流程。", contributions: "我的贡献",
    project1Contribution1: "实现并评估动作与观测空间、球体重置逻辑、接触检测、奖励函数、终止条件和课程学习等任务组件。",
    project1Contribution2: "实现并评估围绕球体推进、方向、接触质量、踢球后恢复和目标距离的奖励项与课程学习。",
    project1Contribution3: "通过实验，使用接触质量、球速、目标方向误差、终止原因和训练稳定性指标分析策略行为。",
    outcome: "当前进展", project1Outcome: "已建立从环境到训练的完整流程。当前迭代聚焦“接近但不踢”、支撑脚选择不稳、球速不足和失衡早停等问题；长时程任务成功率仍在评估中。",
    project2Title: "人形机器人步态策略训练", project2Text: "实现并评估基于仿真的步态策略，为踢球等后续接触丰富任务提供基础。", focus: "关注点",
    project2Point1: "使用关节位置与速度、机身姿态、角速度和速度指令进行状态观测设计。",
    project2Point2: "分析速度跟踪、姿态稳定、能耗惩罚、动作平滑、足部接触与机身高度约束之间的奖励权衡。",
    project2Point3: "在将步态能力迁移至更复杂的全身任务前，开展策略行为诊断。", demoVideo: "演示视频", stage1Video: "第一阶段训练成果视频",
    project4Title: "面向可泛化人形踢球的 Conditional AMP", project4Text: "研究距离条件化的人形机器人踢球，结合 AMP 风格运动先验以及目标距离和踢法类型的课程学习。",
    project4Point1: "为踢法类型和归一化目标距离构建条件向量，并对齐 expert 与 policy 的条件分布。",
    project4Point2: "实现距离分桶、依目标距离变化的踢球后评估窗口，以及恢复课程状态的 checkpoint 支持。",
    project4Point3: "使用目标成功率、完成到达转化率、AMP logits 与非有限 batch 指标验证 reset 生命周期和短程训练稳定性。",
    project3Title: "面向人形机器人技能获得的运动先验学习", project3Text: "关于 AMASS 风格人体运动数据、AMP、编码器-解码器策略和运动潜变量表征的人形技能学习探索。", researchQuestions: "研究问题",
    project3Point1: "如何让人体运动数据为自然且稳定的机器人控制提供有效先验？",
    project3Point2: "如何平衡任务奖励与运动先验奖励，同时不降低任务完成能力？",
    project3Point3: "如何将步态、起身和踢球表示为更连续的技能？",
    worksKicker: "代表性成果", worksTitle: "应用机器人与竞赛工程经历。", patentBadge: "已公开发明专利申请", patentAreaTag: "应用机器人", patentManuscriptTag: "论文撰写中",
    patentTitle: "一种基于正交约束的预标定引导与数据筛选的手眼标定方法及系统", patentChineseTitle: "一种基于正交约束的预标定引导与数据筛选的手眼标定方法及系统",
    patentPublicationNoLabel: "公开号", patentApplicationNoLabel: "申请号", patentDateLabel: "公开日", patentApplicantLabel: "申请人", patentApplicant: "南京邮电大学", patentInventorsLabel: "发明人", patentInventors: "徐学颢、丁大伟、张开岩",
    patentText: "该已公开发明专利申请提出了一套工业机器人手眼标定流程：利用正交直线边缘约束进行预标定、动态筛选点云数据，并优化手眼变换矩阵。这里将其作为补充性的应用机器人工程经验展示，而非我的主要研究方向。",
    aimingBadge: "竞赛工程经历", aimingTitle: "简易自行瞄准装置", aimingText: "在全国大学生电子设计竞赛的 3 人团队中，我负责视觉感知与目标跟踪模块。",
    aimingPoint1: "基于 Raspberry Pi 与工业摄像头搭建实时感知流程，结合颜色阈值分割、轮廓提取和圆形检测定位靶心。",
    aimingPoint2: "以约 30 Hz 输出目标位置信息；针对运动扰动调试阈值与目标筛选逻辑，并与云台和执行机构控制模块联调，实现闭环自动瞄准。",
    skillsKicker: "技术技能", skillsTitle: "研究与工程工具链。", skill1Title: "编程与工程", skill1Text: "Python、C++、Git / GitHub、Linux",
    skill2Title: "机器学习 / 强化学习", skill2Text: "PyTorch、强化学习、PPO、奖励设计、课程学习",
    skill3Title: "机器人学习", skill3Text: "人形机器人运动控制、接触丰富技能学习、运动模仿、AMP 风格运动先验",
    skill4Title: "仿真", skill4Text: "MuJoCo、MJLab、Warp",
    skill5Title: "机器人软件", skill5Text: "ABB RAPID 编程、机器人标定、三维传感、点云处理",
    awardsKicker: "奖项", awardsTitle: "代表性竞赛经历。", award1Title: "RoboCup 中国公开赛 3D 仿真组季军", award1Text: "作为核心开发者，负责机器人强化学习环境、奖励设计、训练流程、阵型行为和队内通信相关工作。",
    award2Title: "江苏省机器人竞赛 3D 仿真组季军", award2Text: "开发传球评分、阵型调度和射门决策等上层策略组件。",
    award3Title: "全国大学生电子设计竞赛江苏赛区三等奖", award3Text: "3 人团队中负责简易自行瞄准装置的视觉感知与目标跟踪模块。",
    contactKicker: "联系", contactTitle: "欢迎围绕研究与合作展开交流。", contactText: "我关注人形机器人学习、强化学习和具身智能方向的研究机会。",
    footerText: "为机器人与人工智能科研申请构建的学术作品集。", backToTop: "返回顶部"
  };

  const translations = { zh };

  const getSavedLanguage = () => {
    try {
      return localStorage.getItem("portfolio-language") || "en";
    } catch {
      return "en";
    }
  };

  const saveLanguage = (language) => {
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      // The page remains fully functional when storage is unavailable.
    }
  };

  const applyLanguage = (language) => {
    const activeLanguage = language === "zh" ? "zh" : "en";
    const dictionary = activeLanguage === "zh" ? translations.zh : english;
    translatable.forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value) element.textContent = value;
    });
    titleTranslatable.forEach((element) => {
      if (element.dataset.i18nTitle === "backToTop") element.title = activeLanguage === "zh" ? zh.backToTop : "Back to top";
    });
    document.documentElement.lang = activeLanguage === "zh" ? "zh-CN" : "en";
    document.title = activeLanguage === "zh" ? "徐学颢 | 可泛化人形机器人技能" : "Xuehao Xu | Generalizable Humanoid Robot Skills";
    languageButtons.forEach((button) => {
      const selected = button.dataset.lang === activeLanguage;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    saveLanguage(activeLanguage);
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }));

  const setActiveNav = (id) => {
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
  };

  if ("IntersectionObserver" in window) {
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveNav(visible.target.id);
    }, { rootMargin: "-32% 0px -58% 0px", threshold: [0.02, 0.25, 0.6] });
    sections.forEach((section) => observer.observe(section));
  } else {
    setActiveNav("home");
  }

  window.addEventListener("scroll", () => backToTop?.classList.toggle("visible", window.scrollY > 640), { passive: true });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  languageButtons.forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));
  if (year) year.textContent = new Date().getFullYear();
  applyLanguage(getSavedLanguage());
})();
