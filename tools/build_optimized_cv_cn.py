from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


OUTPUT = Path("Xuehao_Xu_Research_CV_CN_v3.docx")
NAVY = "12314D"
BLUE = "1E6E96"
INK = "1D2730"
MUTED = "5E6C77"
RULE = "C8D4DE"


def set_font(run, size, color=INK, bold=False, italic=False):
    run.font.name = "Microsoft YaHei"
    run._element.rPr.rFonts.set(qn("w:ascii"), "Arial")
    run._element.rPr.rFonts.set(qn("w:hAnsi"), "Arial")
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "Microsoft YaHei")
    run.font.size = Pt(size)
    run.font.color.rgb = RGBColor.from_string(color)
    run.bold = bold
    run.italic = italic


def set_para(paragraph, before=0, after=0, line=1.0, keep=False):
    fmt = paragraph.paragraph_format
    fmt.space_before = Pt(before)
    fmt.space_after = Pt(after)
    fmt.line_spacing = line
    fmt.keep_with_next = keep


def add_bottom_border(paragraph, color=RULE):
    p_pr = paragraph._p.get_or_add_pPr()
    borders = p_pr.first_child_found_in("w:pBdr")
    if borders is None:
        borders = OxmlElement("w:pBdr")
        p_pr.append(borders)
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:space"), "4")
    bottom.set(qn("w:color"), color)
    borders.append(bottom)


def add_section(doc, title):
    p = doc.add_paragraph()
    set_para(p, before=7, after=4, line=1.0, keep=True)
    set_font(p.add_run(title), 9.2, BLUE, bold=True)
    add_bottom_border(p)


def add_body(doc, text, before=0, after=2.5, size=9.15, color=INK, italic=False, keep=False):
    p = doc.add_paragraph()
    set_para(p, before=before, after=after, line=1.07, keep=keep)
    set_font(p.add_run(text), size, color, italic=italic)
    return p


def add_project_title(doc, title, date, subtitle):
    p = doc.add_paragraph()
    set_para(p, before=3, after=0.5, line=1.0, keep=True)
    p.paragraph_format.tab_stops.add_tab_stop(Inches(7.12), WD_TAB_ALIGNMENT.RIGHT)
    set_font(p.add_run(title), 10.05, NAVY, bold=True)
    set_font(p.add_run(f"\t{date}"), 9.05, MUTED, italic=True)
    subtitle_para = doc.add_paragraph()
    set_para(subtitle_para, before=0, after=1.1, line=1.0, keep=True)
    set_font(subtitle_para.add_run(subtitle), 8.9, MUTED, italic=True)


def add_bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    set_para(p, before=0, after=1.2, line=1.05)
    p.paragraph_format.left_indent = Inches(0.19)
    p.paragraph_format.first_line_indent = Inches(-0.14)
    set_font(p.add_run(text), 8.95)


def add_skill(doc, label, value):
    p = doc.add_paragraph()
    set_para(p, before=0, after=1.5, line=1.05)
    set_font(p.add_run(f"{label}："), 9.0, NAVY, bold=True)
    set_font(p.add_run(value), 9.0)


def main():
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(0.52)
    section.bottom_margin = Inches(0.52)
    section.left_margin = Inches(0.68)
    section.right_margin = Inches(0.68)
    section.header_distance = Inches(0.25)
    section.footer_distance = Inches(0.25)

    normal = doc.styles["Normal"]
    normal.font.name = "Microsoft YaHei"
    normal._element.rPr.rFonts.set(qn("w:ascii"), "Arial")
    normal._element.rPr.rFonts.set(qn("w:hAnsi"), "Arial")
    normal._element.rPr.rFonts.set(qn("w:eastAsia"), "Microsoft YaHei")
    normal.font.size = Pt(9.15)
    normal.font.color.rgb = RGBColor.from_string(INK)

    title = doc.add_paragraph()
    set_para(title, after=1, line=1.0)
    set_font(title.add_run("徐学颢"), 21, NAVY, bold=True)
    set_font(title.add_run("  |  科研简历"), 10.2, MUTED)

    contact = doc.add_paragraph()
    set_para(contact, after=4, line=1.0)
    set_font(contact.add_run("邮箱: xuxue6800@gmail.com | GitHub: github.com/srontover | 个人主页: srontover.github.io"), 8.85, MUTED)
    add_bottom_border(contact, BLUE)

    add_section(doc, "研究兴趣")
    add_body(doc, "人形机器人学习；可泛化身体技能学习；移动操作；强化学习；运动先验与模仿学习；面向身体控制的感知；仿真到真实与学习动力学；接触丰富机器人控制", after=2.5, size=9.05)

    add_section(doc, "教育经历")
    p = doc.add_paragraph()
    set_para(p, after=0.5, line=1.0, keep=True)
    set_font(p.add_run("南京邮电大学（NJUPT）"), 10.0, NAVY, bold=True)
    add_body(doc, "人工智能专业 工学学士候选人 | 预计毕业：2028 年", after=0.6, size=9.05, color=MUTED)
    add_body(doc, "GPA：4.08/5.0 | 人工智能专业排名：3/133", after=2, size=9.05)

    add_section(doc, "科研经历")
    projects = [
        (
            "通过强化学习学习人形机器人的动态技能",
            "2026-至今",
            "T1 人形机器人踢球、步态与技能泛化",
            [
                "基于 MuJoCo/MJLab/Warp 仿真工具链，为人形机器人运动控制与接触丰富踢球任务实现并修改强化学习环境。",
                "实现并评估动作与观测空间、球体重置逻辑、接触检测、奖励函数、终止条件以及课程学习等任务组件。",
                "通过实验分析策略行为，包括接触质量、足球速度、目标方向误差、踢球后恢复能力和训练稳定性。",
                "研究 Conditional AMP 和运动先验驱动的策略，并探索不同球体位置、踢球方向和任务条件下的技能泛化能力。",
            ],
        ),
        (
            "Conditional AMP 驱动的人形机器人泛化踢球学习",
            "2026",
            "强化学习研究项目",
            [
                "研究距离条件化 Conditional AMP 在人形机器人踢球任务中的应用，使用目标距离和踢法类型条件向量与课程学习。",
                "研究 expert-policy 条件分布对齐与运动先验如何影响训练稳定性和跨条件技能泛化。",
            ],
        ),
        (
            "面向可泛化人形技能的运动先验学习",
            "2026",
            "研究探索",
            [
                "调研 AMP 类运动先验、人体运动数据、encoder-decoder 策略以及 latent 表示在可泛化人形技能学习中的应用。",
                "探索运动先验如何支持自然、稳定且可迁移的机器人行为，同时不牺牲任务完成能力。",
            ],
        ),
        (
            "基于三维感知与几何约束的机器人手眼标定",
            "2026",
            "科研项目 | 论文撰写中 | 南京邮电大学",
            [
                "开展机器人手眼标定研究，已形成专利成果并正在进行论文撰写。",
                "研究基于正交几何约束、点云筛选和优化方法的多阶段标定流程。",
                "使用 ABB 工业机器人和三维传感系统开展标定评估实验。",
            ],
        ),
    ]
    for title_text, date, subtitle, bullets in projects:
        add_project_title(doc, title_text, date, subtitle)
        for bullet in bullets:
            add_bullet(doc, bullet)

    add_section(doc, "技术能力")
    skills = [
        ("编程", "Python、C++、Git/GitHub、Linux"),
        ("机器学习与强化学习", "PyTorch、强化学习、PPO、奖励设计、课程学习"),
        ("机器人学习", "可泛化技能学习、人形机器人运动控制、移动操作概念、运动模仿、AMP 类运动先验"),
        ("仿真工具", "MuJoCo、MJLab、Warp"),
        ("机器人软件", "ABB RAPID 编程、机器人标定、三维感知、点云处理"),
    ]
    for label, value in skills:
        add_skill(doc, label, value)

    add_section(doc, "竞赛与荣誉")
    for award in [
        "RoboCup 中国公开赛 3D 仿真组第三名（2025）。",
        "江苏省机器人竞赛 3D 仿真组第三名（2025）。",
        "全国大学生电子设计竞赛江苏省赛区三等奖（2024）。",
    ]:
        add_bullet(doc, award)

    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_para(footer, before=0, after=0, line=1.0)
    set_font(footer.add_run("徐学颢 | 科研简历"), 7.5, MUTED)

    doc.core_properties.title = "徐学颢 - 科研简历"
    doc.core_properties.author = "徐学颢"
    doc.core_properties.subject = "科研简历"
    doc.save(OUTPUT)


if __name__ == "__main__":
    main()
