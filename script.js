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
    navAbout: "关于我", navInterests: "研究兴趣", navEducation: "教育背景", navProjects: "项目", navWorks: "成果", navSkills: "技能", navAwards: "奖项", navContact: "联系",
    heroEyebrow: "学术作品集 | 机器人与人工智能",
    heroTitle: "人工智能专业本科生，关注人形机器人学习、强化学习与接触丰富的机器人控制。",
    heroText: "我正在为人形机器人的步态与踢球建立基于仿真的学习流程，同时探索运动先验、Conditional AMP 与技能泛化。机器人标定工作则为我提供了真实机器人系统和三维传感的补充工程经验。",
    cv: "科研简历", scholar: "Google Scholar（待补充）",
    snapshotTitle: "研究概览", snapshotAreaLabel: "主要方向", snapshotArea: "人形机器人学习与强化学习",
    snapshotFocusLabel: "当前工作", snapshotFocus: "T1 踢球、Conditional AMP、奖励设计、距离条件课程学习",
    snapshotEngineeringLabel: "工程经验", snapshotEngineering: "ABB 机器人标定、三维传感、点云处理",
    snapshotToolsLabel: "工具链", snapshotTools: "Python、C++、PyTorch、MuJoCo、MJLab、Warp、Git、Linux",
    aboutKicker: "关于我", aboutTitle: "面向人形机器人学习的研究型工程实践。",
    aboutText1: "我就读于南京邮电大学人工智能专业，研究兴趣集中在人形机器人学习、全身技能学习、强化学习、运动模仿和接触丰富控制。",
    aboutText2: "当前工作通过仿真研究步态与踢球策略，涵盖奖励塑形、课程学习、策略诊断和 Conditional AMP。同时，手眼标定工作使我接触到 ABB 机器人系统、三维传感、点云数据与实际标定约束。",
    interestsKicker: "研究兴趣", interestsTitle: "面向可泛化人形机器人技能的聚焦路径。",
    interest1Title: "人形机器人学习", interest1Text: "学习人形机器人的步态与全身技能，关注稳定的接触丰富行为和协调运动。",
    interest2Title: "机器人强化学习", interest2Text: "面向机器人控制的任务设计、奖励塑形、课程学习、策略评估与诊断流程。",
    interest3Title: "运动先验与模仿学习", interest3Text: "AMP 风格先验、人体运动数据、模仿学习与潜变量表征，用于获得自然且有效的机器人运动。",
    interest4Title: "仿真到真实迁移", interest4Text: "未来研究方向：关注建模误差、观测噪声、动作延迟、接触建模与硬件约束下的鲁棒性。",
    educationKicker: "教育背景", educationTitle: "南京邮电大学", educationDate: "2024 年 9 月至今", educationDegree: "人工智能专业工学学士在读", educationSchool: "南京邮电大学（NJUPT）",
    educationExpected: "预计毕业时间：2028 年", educationGpa: "GPA：4.0 / 5.0", educationRank: "专业排名：4 / 133",
    educationCoursework: "相关课程：机器学习、深度学习、人工智能导论、数据结构、线性代数、概率论与数理统计。",
    projectsKicker: "研究 / 项目", projectsTitle: "持续推进的人形控制、强化学习与运动先验研究。",
    tagHumanoidRl: "人形强化学习", tagLocomotion: "步态控制", tagReward: "奖励设计", tagConditionalAmp: "Conditional AMP", tagInProgress: "进行中", tagMotionPrior: "运动先验", tagImitation: "模仿学习",
    project1Title: "基于强化学习的 T1 人形机器人踢球任务", project1Text: "研究让 T1 人形机器人在保持平衡、选择支撑脚并将球踢向目标的同时完成接触丰富的踢球控制。",
    problemGoal: "问题 / 目标", project1Goal: "构建连接步态稳定、接触时机、球体交互与目标导向控制的任务与训练流程。", contributions: "我的贡献",
    project1Contribution1: "设计动作与观测空间、球体重置逻辑、接触检测、奖励函数、终止条件和训练指标。",
    project1Contribution2: "围绕球体推进、方向、接触质量、踢球后恢复和目标距离开发奖励项与课程学习。",
    project1Contribution3: "通过接触质量、球速、目标方向误差、终止原因和训练稳定性指标分析策略行为。",
    outcome: "当前进展", project1Outcome: "已建立从环境到训练的完整流程。当前迭代聚焦“接近但不踢”、支撑脚选择不稳、球速不足和失衡早停等问题；长时程任务成功率仍在评估中。",
    project2Title: "人形机器人步态策略训练", project2Text: "开发并研究基于仿真的步态策略，为踢球等后续接触丰富任务提供基础。", focus: "关注点",
    project2Point1: "使用关节位置与速度、机身姿态、角速度和速度指令进行状态观测设计。",
    project2Point2: "分析速度跟踪、姿态稳定、能耗惩罚、动作平滑、足部接触与机身高度约束之间的奖励权衡。",
    project2Point3: "在将步态能力迁移至更复杂的全身任务前，开展策略行为诊断。", demoVideo: "演示视频",
    project4Title: "面向可泛化人形踢球的 Conditional AMP", project4Text: "探索距离条件化的人形机器人踢球，结合 AMP 风格运动先验以及目标距离和踢法类型的课程学习。",
    project4Point1: "为踢法类型和归一化目标距离构建条件向量，并对齐 expert 与 policy 的条件分布。",
    project4Point2: "实现距离分桶、依目标距离变化的踢球后评估窗口，以及恢复课程状态的 checkpoint 支持。",
    project4Point3: "使用目标成功率、完成到达转化率、AMP logits 与非有限 batch 指标验证 reset 生命周期和短程训练稳定性。",
    project3Title: "基于人体运动数据的运动先验", project3Text: "关于 AMASS 风格人体运动数据、AMP、编码器-解码器策略和运动潜变量表征的人形技能学习探索。", researchQuestions: "研究问题",
    project3Point1: "如何让人体运动数据为自然且稳定的机器人控制提供有效先验？",
    project3Point2: "如何平衡任务奖励与运动先验奖励，同时不降低任务完成能力？",
    project3Point3: "如何将步态、起身和踢球表示为更连续的技能？",
    worksKicker: "代表性成果", worksTitle: "专利申请与应用机器人工作。", patentBadge: "已公开发明专利申请", patentAreaTag: "应用机器人",
    patentTitle: "一种基于正交约束的预标定引导与数据筛选的手眼标定方法及系统", patentChineseTitle: "一种基于正交约束的预标定引导与数据筛选的手眼标定方法及系统",
    patentPublicationNoLabel: "公开号", patentApplicationNoLabel: "申请号", patentDateLabel: "公开日", patentApplicantLabel: "申请人", patentApplicant: "南京邮电大学", patentInventorsLabel: "发明人", patentInventors: "徐学颢、丁大伟、张开岩",
    patentText: "该已公开发明专利申请提出了一套工业机器人手眼标定流程：利用正交直线边缘约束进行预标定、动态筛选点云数据，并优化手眼变换矩阵。这里将其作为补充性的应用机器人工程经验展示，而非我的主要研究方向。",
    skillsKicker: "技术技能", skillsTitle: "研究与工程工具链。", skill1Title: "编程与工程", skill1Text: "Python、C++、Git / GitHub、Linux",
    skill2Title: "机器学习 / 强化学习", skill2Text: "PyTorch、强化学习、PPO、奖励设计、课程学习",
    skill3Title: "机器人学习", skill3Text: "人形机器人运动控制、接触丰富技能学习、运动模仿、AMP 风格运动先验",
    skill4Title: "仿真", skill4Text: "MuJoCo、MJLab、Warp",
    skill5Title: "机器人系统", skill5Text: "ABB 机器人编程、手眼标定、三维传感、点云处理",
    awardsKicker: "奖项", awardsTitle: "代表性竞赛经历。", award1Title: "RoboCup 中国公开赛 3D 仿真组季军", award1Text: "作为核心开发者，负责机器人强化学习环境、奖励设计、训练流程、阵型行为和队内通信相关工作。",
    award2Title: "江苏省机器人竞赛 3D 仿真组季军", award2Text: "开发传球评分、阵型调度和射门决策等上层策略组件。",
    award3Title: "全国大学生电子设计竞赛江苏赛区三等奖",
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
    document.title = activeLanguage === "zh" ? "徐学颢 | 人形机器人学习" : "Xuehao Xu | Humanoid Robot Learning";
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
