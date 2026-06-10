const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-menu a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const langButtons = Array.from(document.querySelectorAll(".lang-button"));
const i18nNodes = Array.from(document.querySelectorAll("[data-i18n]"));
const yearNode = document.querySelector("#year");

const translations = {
  en: {
    pageTitle: "Xuehao Xu | Robot Learning & Humanoid Control",
    pageDescription:
      "Xuehao Xu's academic portfolio in artificial intelligence, robot learning, humanoid control, and simulation-based reinforcement learning.",
    brand: "Xuehao Xu",
    navAbout: "About",
    navInterests: "Interests",
    navEducation: "Education",
    navProjects: "Projects",
    navSkills: "Skills",
    navAwards: "Awards",
    navContact: "Contact",
    heroEyebrow: "Modern Academic Portfolio · Robotics & AI",
    heroTitle:
      "Undergraduate student majoring in Artificial Intelligence, focusing on robot reinforcement learning, humanoid locomotion, motion control, and simulation-based robot learning.",
    heroText:
      "I am interested in building reliable robot policies through careful environment modeling, training design, and engineering implementation, with an emphasis on stable, flexible, and transferable motion in complex physical environments.",
    scholar: "Google Scholar",
    cv: "CV",
    snapshotTitle: "Research Snapshot",
    snapshotAreaLabel: "Primary Area",
    snapshotArea: "Artificial Intelligence · Robot Learning · Humanoid Control",
    snapshotFocusLabel: "Current Focus",
    snapshotFocus: "RL task design, reward shaping, curriculum learning, locomotion, kicking",
    snapshotToolsLabel: "Toolchain",
    snapshotTools: "Python, PyTorch, MuJoCo, MJLab, Warp, Git, Linux",
    aboutKicker: "About Me",
    aboutTitle: "Research-oriented engineering practice for embodied intelligence.",
    aboutText1:
      "I am an Artificial Intelligence undergraduate at Nanjing University of Posts and Telecommunications. My current work and interests center on bipedal and humanoid robot control, especially how reinforcement learning policies can be trained, evaluated, and progressively extended from basic locomotion to more complex interaction tasks.",
    aboutText2:
      "I believe robot intelligence depends not only on model scale, but also on a concrete understanding of physics, control systems, and task structure. I care about why a robot policy learns or fails, and how better modeling, training, and implementation can make it stable and reliable.",
    interestsKicker: "Research Interests",
    interestsTitle: "Focused directions for future research applications.",
    interest1Title: "Robot Learning",
    interest1Text: "Policy learning for physically grounded robot behaviors in high-dimensional control spaces.",
    interest2Title: "Reinforcement Learning",
    interest2Text: "PPO, reward shaping, curriculum learning, staged task design, and policy evaluation.",
    interest3Title: "Whole-body Control",
    interest3Text: "Humanoid locomotion, balance, contact-rich motion, get-up skills, and kicking tasks.",
    interest4Title: "Motion Priors",
    interest4Text: "AMASS, AMP, motion latent representations, imitation learning, and natural movement constraints.",
    interest5Title: "Sim-to-Real Preparation",
    interest5Text:
      "Robust simulation training, observation design, randomization, and sim-to-real transfer as a future research interest.",
    interest6Title: "Sensor Calibration",
    interest6Text: "Hand-eye calibration, sensor alignment, and reliable perception-to-control pipelines.",
    interest7Title: "Robotics Perception",
    interest7Text: "Vision-guided control and sensor uncertainty in dynamic robot task environments.",
    interest8Title: "Robotics Systems",
    interest8Text: "Interest in robot experiment workflows, calibration-aware manipulation, and engineering validation.",
    educationKicker: "Education",
    educationTitle: "Nanjing University of Posts & Telecommunications",
    educationDate: "Sep 2024 - Present",
    educationDegree: "B.Eng. Candidate, Artificial Intelligence",
    educationYear: "Current year: Sophomore undergraduate student",
    educationGpa: "GPA: 4.0 / 5.0",
    educationRank: "Rank: 4 / 133",
    educationCoursework:
      "Coursework: Data Structures, Machine Learning, Deep Learning, Introduction to Artificial Intelligence, Programming, Linear Algebra, Probability & Mathematical Statistics, and control-related foundations.",
    projectsKicker: "Research / Projects",
    projectsTitle: "Selected work in humanoid reinforcement learning and robot control.",
    tagHumanoidRl: "Humanoid RL",
    tagLocomotion: "Locomotion",
    tagReward: "Reward Design",
    tagMotionPrior: "Motion Prior",
    tagImitation: "Imitation Learning",
    project1Title: "T1 Humanoid Kicking Task with Reinforcement Learning",
    project1Text:
      "Built a reinforcement learning task for a T1 humanoid robot to kick a ball while maintaining body stability. The task required coordinating balance, support-foot selection, contact timing, and target-oriented ball velocity.",
    contributions: "My Contributions",
    project1Contribution1:
      "Configured action and observation spaces, ball reset logic, contact sensors, rewards, termination conditions, and training metrics.",
    project1Contribution2:
      "Designed staged reward shaping and curriculum learning for position, target direction, target distance, and vision-noise randomization.",
    project1Contribution3:
      "Analyzed training logs for contact rate, ball speed, travel distance, target direction error, stability, and episode termination causes.",
    outcome: "Outcome / Progress",
    project1Outcome:
      "Established a full environment-to-training workflow and iteratively improved issues such as approaching without kicking, unstable kicking-foot selection, insufficient ball speed, and early termination due to imbalance.",
    project2Title: "Humanoid Locomotion Policy Training",
    project2Text:
      "Trained a basic locomotion policy in simulation to support stable walking and velocity tracking, providing the motion capability needed for later kicking-task development.",
    focus: "Focus",
    project2Point1:
      "State observation design: joint positions, joint velocities, body posture, angular velocity, and velocity commands.",
    project2Point2:
      "Reward terms for velocity tracking, posture stability, energy penalties, action smoothness, foot contact, and body-height constraints.",
    project2Point3:
      "Trade-off analysis across competing reward terms before transferring locomotion ability into more complex tasks.",
    demoVideo: "Demo video",
    project3Title: "Motion Priors from Human Motion Data",
    project3Text:
      "Explored how AMASS-style human motion data, AMP, encoder-decoder policies, and motion-latent representations can provide more natural and stable constraints for humanoid control.",
    researchQuestions: "Research Questions",
    project3Point1: "How to extract useful motion patterns from human motion data for robot control.",
    project3Point2: "How to balance task rewards and motion priors without reducing task completion ability.",
    project3Point3: "How to unify locomotion, get-up, and kicking into more continuous motion representations.",
    worksKicker: "Selected Works",
    worksTitle: "Publications, preprints, and patents.",
    worksText:
      "No formal publications, preprints, or patents are listed yet. Current research experience is summarized through the project work above.",
    skillsKicker: "Skills",
    skillsTitle: "Research and engineering toolkit.",
    skill1Title: "Programming",
    skill1Text: "Python, PyTorch, Git / GitHub, Linux development basics",
    skill2Title: "Robotics",
    skill2Text: "Humanoid control, bipedal locomotion, contact modeling, physics-based task design",
    skill3Title: "ML / RL",
    skill3Text: "PPO, deep reinforcement learning, reward shaping, curriculum learning, imitation learning",
    skill4Title: "Simulation & Tools",
    skill4Text: "MuJoCo, MJLab, Warp, Isaac Gym / Isaac Lab concepts, experiment logging and debugging",
    skill5Title: "Research Methods",
    skill5Text: "Observation design, staged training, metric analysis, policy behavior diagnosis",
    skill6Title: "Robotics Systems Interest",
    skill6Text:
      "Interested in industrial robotics, hand-eye calibration, and sensor uncertainty; current work is mainly simulation-based.",
    awardsKicker: "Honors / Awards",
    awardsTitle: "Competitions and team contributions.",
    award1Title: "Third Prize, RoboCup China Open 3D Simulation League",
    award1Text:
      "As a core developer, I worked on RL environment construction, reward design, training workflow optimization, and upper-level strategy modules such as formation behavior and team communication.",
    award2Title: "Third Prize, Jiangsu Provincial Robot Competition, 3D Simulation Group",
    award2Text:
      "As a core developer, I implemented upper-level strategy logic including pass evaluation, robot formation scheduling, and shooting decisions.",
    contactKicker: "Contact",
    contactTitle: "Open to research discussions and application opportunities.",
    contactText:
      "I am interested in research opportunities related to robot learning, humanoid control, reinforcement learning, and simulation-based robotics.",
    backToTop: "Back to top",
  },
  zh: {
    pageTitle: "徐学颢 | 机器人学习与人形机器人控制",
    pageDescription: "徐学颢的个人学术主页，关注人工智能、机器人学习、人形机器人控制和仿真环境中的强化学习。",
    brand: "徐学颢",
    navAbout: "关于我",
    navInterests: "研究兴趣",
    navEducation: "教育经历",
    navProjects: "项目经历",
    navSkills: "技能",
    navAwards: "奖项",
    navContact: "联系",
    heroEyebrow: "学术个人主页 · 机器人与人工智能",
    heroTitle: "人工智能专业本科生，关注机器人强化学习、人形机器人运动控制、运动控制与仿真环境中的机器人学习。",
    heroText:
      "我希望通过扎实的环境建模、训练设计和工程实现，让机器人在复杂物理环境中获得更稳定、灵活、可迁移的运动能力。",
    scholar: "Google Scholar",
    cv: "个人简历",
    snapshotTitle: "研究概览",
    snapshotAreaLabel: "主要方向",
    snapshotArea: "人工智能 · 机器人学习 · 人形机器人控制",
    snapshotFocusLabel: "当前重点",
    snapshotFocus: "强化学习任务设计、奖励塑形、课程学习、行走控制、踢球任务",
    snapshotToolsLabel: "技术工具",
    snapshotTools: "Python、PyTorch、MuJoCo、MJLab、Warp、Git、Linux",
    aboutKicker: "关于我",
    aboutTitle: "面向具身智能的科研导向工程实践。",
    aboutText1:
      "我是南京邮电大学人工智能专业本科生。目前的学习、项目与研究兴趣主要围绕双足/人形机器人控制展开，尤其关注如何训练、评估并逐步扩展强化学习策略，使其从基础 locomotion 过渡到更复杂的交互任务。",
    aboutText2:
      "我相信机器人智能不仅来自模型规模，也来自对物理世界、控制系统和任务结构的深入理解。相比只关注最终效果，我更关注机器人为什么能学会、为什么学不会，以及如何通过更合理的建模、训练和工程实现让策略稳定可靠。",
    interestsKicker: "研究兴趣",
    interestsTitle: "面向未来科研申请的重点方向。",
    interest1Title: "机器人学习",
    interest1Text: "面向高维连续控制空间中物理可解释机器人行为的策略学习。",
    interest2Title: "强化学习",
    interest2Text: "PPO、奖励塑形、课程学习、分阶段任务设计与策略评估。",
    interest3Title: "全身控制",
    interest3Text: "人形机器人 locomotion、平衡控制、接触丰富运动、起身技能与踢球任务。",
    interest4Title: "运动先验",
    interest4Text: "AMASS、AMP、motion latent、模仿学习与自然运动约束。",
    interest5Title: "Sim-to-Real 前期准备",
    interest5Text: "关注鲁棒仿真训练、观测设计、随机化和仿真到现实迁移；目前主要作为未来研究兴趣。",
    interest6Title: "传感器标定",
    interest6Text: "手眼标定、传感器对齐，以及可靠的感知到控制流程。",
    interest7Title: "机器人感知",
    interest7Text: "视觉引导控制，以及动态机器人任务环境中的传感器不确定性。",
    interest8Title: "机器人系统",
    interest8Text: "对机器人实验流程、标定感知的操作任务和工程验证感兴趣。",
    educationKicker: "教育经历",
    educationTitle: "南京邮电大学",
    educationDate: "2024 年 9 月 - 至今",
    educationDegree: "人工智能专业，本科在读",
    educationYear: "当前年级：本科二年级",
    educationGpa: "GPA：4.0 / 5.0",
    educationRank: "专业排名：4 / 133",
    educationCoursework:
      "主要课程：数据结构、机器学习、深度学习、人工智能导论、程序设计、线性代数、概率论与数理统计、自动控制相关基础课程。",
    projectsKicker: "科研 / 项目经历",
    projectsTitle: "人形机器人强化学习与运动控制相关项目。",
    tagHumanoidRl: "人形机器人 RL",
    tagLocomotion: "行走控制",
    tagReward: "奖励设计",
    tagMotionPrior: "运动先验",
    tagImitation: "模仿学习",
    project1Title: "T1 人形机器人踢球强化学习任务开发",
    project1Text:
      "基于 T1 人形机器人构建踢球强化学习任务，使机器人在保持身体稳定的同时，根据球的位置和目标方向完成有效踢球。任务需要协调平衡、支撑脚选择、接触时机和目标方向球速。",
    contributions: "我的贡献",
    project1Contribution1: "配置动作空间、观测空间、球体 reset 逻辑、接触传感器、奖励项、终止条件和训练指标。",
    project1Contribution2: "设计分阶段 reward shaping 与课程学习，逐步加入球位置、目标方向、目标距离和视觉误差扰动。",
    project1Contribution3: "分析触球率、球速、前进距离、目标方向误差、站立稳定性和 episode 终止原因等训练日志指标。",
    outcome: "结果 / 进展",
    project1Outcome:
      "完成了从环境建模到策略训练的完整流程，并针对只靠近球不出脚、踢球脚选择不稳定、球速不足和身体失衡提前终止等问题迭代优化。",
    project2Title: "人形机器人 Locomotion 策略训练",
    project2Text:
      "在仿真环境中训练基础 locomotion 策略，使机器人能够实现稳定行走和速度跟踪，并为后续踢球任务提供基础运动能力。",
    focus: "重点内容",
    project2Point1: "状态观测设计：关节位置、关节速度、身体姿态、角速度和速度命令等。",
    project2Point2: "奖励项设计：速度跟踪、姿态稳定、能耗惩罚、动作平滑、脚部接触和身体高度约束。",
    project2Point3: "分析不同奖励项之间的权衡，并将基础行走能力迁移到更复杂任务中。",
    demoVideo: "演示视频",
    project3Title: "基于人类运动数据的人形机器人动作先验探索",
    project3Text:
      "探索 AMASS 人类运动数据、AMP、encoder-decoder 策略和 motion latent 表示如何为人形机器人控制提供更自然、更稳定的动作约束。",
    researchQuestions: "关注问题",
    project3Point1: "如何从人类运动数据中提取对机器人控制有用的运动模式。",
    project3Point2: "如何平衡任务奖励和运动先验，避免影响任务完成能力。",
    project3Point3: "如何将 locomotion、get-up 和 kicking 等技能统一到更连续的运动表示中。",
    worksKicker: "成果",
    worksTitle: "论文、预印本与专利",
    worksText: "目前暂未列出正式论文、预印本或专利。当前科研经历主要通过上方项目展示。",
    skillsKicker: "技能",
    skillsTitle: "科研与工程工具箱。",
    skill1Title: "编程",
    skill1Text: "Python、PyTorch、Git / GitHub、Linux 基础开发环境",
    skill2Title: "机器人",
    skill2Text: "人形机器人控制、双足 locomotion、接触建模、物理仿真任务设计",
    skill3Title: "机器学习 / 强化学习",
    skill3Text: "PPO、深度强化学习、奖励塑形、课程学习、模仿学习",
    skill4Title: "仿真与工具",
    skill4Text: "MuJoCo、MJLab、Warp、Isaac Gym / Isaac Lab 相关概念、实验日志与调试",
    skill5Title: "研究方法",
    skill5Text: "观测设计、分阶段训练、指标分析、策略行为诊断",
    skill6Title: "机器人系统兴趣",
    skill6Text: "对工业机器人、手眼标定和传感器不确定性感兴趣；当前工作主要基于仿真环境。",
    awardsKicker: "荣誉 / 奖项",
    awardsTitle: "竞赛经历与团队贡献。",
    award1Title: "2025 年 RoboCup 中国区 3D 仿真组季军",
    award1Text:
      "作为主要开发者，负责机器人强化学习环境搭建、奖励设计和训练流程优化，同时参与阵型运作、队内通信等上层策略模块。",
    award2Title: "2025 年江苏省机器人大赛仿真 3D 组季军",
    award2Text: "作为主要开发者，负责机器人上层策略编写，包括传球评分算法、机器人阵型调度和射门上层逻辑。",
    contactKicker: "联系方式",
    contactTitle: "欢迎科研交流与申请相关沟通。",
    contactText: "我对机器人学习、人形机器人控制、强化学习和仿真环境中的机器人研究机会感兴趣。",
    backToTop: "返回顶部",
  },
};

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const applyLanguage = (lang) => {
  const dictionary = translations[lang] ?? translations.en;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = dictionary.pageTitle;

  const description = document.querySelector('meta[name="description"]');
  description?.setAttribute("content", dictionary.pageDescription);

  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("preferredLanguage", lang);
};

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveNav(visible.target.id);
    }
  },
  {
    rootMargin: "-25% 0px -55% 0px",
    threshold: [0.12, 0.25, 0.5],
  }
);

sections.forEach((section) => observer.observe(section));

const savedLanguage = localStorage.getItem("preferredLanguage");
const browserLanguage = navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
applyLanguage(savedLanguage || browserLanguage);
