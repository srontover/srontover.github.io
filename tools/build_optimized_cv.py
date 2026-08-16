from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.enum.section import WD_SECTION
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


SOURCE = Path("Xuehao_Xu_Research_CV_EN_v3.docx")
OUTPUT = Path("Xuehao_Xu_Research_CV_EN_v3.docx")

NAVY = "12314D"
BLUE = "1E6E96"
INK = "1D2730"
MUTED = "5E6C77"
RULE = "C8D4DE"


def set_font(run, size, color=INK, bold=False, italic=False):
    run.font.name = "Arial"
    run._element.rPr.rFonts.set(qn("w:ascii"), "Arial")
    run._element.rPr.rFonts.set(qn("w:hAnsi"), "Arial")
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
    run = p.add_run(title)
    set_font(run, 9.2, BLUE, bold=True)
    add_bottom_border(p)


def add_body(doc, text, before=0, after=2.5, size=9.15, color=INK, italic=False, keep=False):
    p = doc.add_paragraph()
    set_para(p, before=before, after=after, line=1.07, keep=keep)
    run = p.add_run(text)
    set_font(run, size, color, italic=italic)
    return p


def add_project_title(doc, title, date, subtitle):
    p = doc.add_paragraph()
    set_para(p, before=3, after=0.5, line=1.0, keep=True)
    p.paragraph_format.tab_stops.add_tab_stop(Inches(7.12), WD_TAB_ALIGNMENT.RIGHT)
    run = p.add_run(title)
    set_font(run, 10.05, NAVY, bold=True)
    date_run = p.add_run(f"\t{date}")
    set_font(date_run, 9.05, MUTED, italic=True)
    subtitle_para = doc.add_paragraph()
    set_para(subtitle_para, before=0, after=1.1, line=1.0, keep=True)
    set_font(subtitle_para.add_run(subtitle), 8.9, MUTED, italic=True)


def add_bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    set_para(p, before=0, after=1.2, line=1.05)
    p.paragraph_format.left_indent = Inches(0.19)
    p.paragraph_format.first_line_indent = Inches(-0.14)
    run = p.add_run(text)
    set_font(run, 8.95)


def add_skill(doc, label, value):
    p = doc.add_paragraph()
    set_para(p, before=0, after=1.5, line=1.05)
    run = p.add_run(f"{label}: ")
    set_font(run, 9.0, NAVY, bold=True)
    run = p.add_run(value)
    set_font(run, 9.0)


def extract_texts(source):
    texts = [p.text.strip() for p in source.paragraphs]
    return texts


def main():
    source = Document(SOURCE)
    t = extract_texts(source)

    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(0.52)
    section.bottom_margin = Inches(0.52)
    section.left_margin = Inches(0.68)
    section.right_margin = Inches(0.68)
    section.header_distance = Inches(0.25)
    section.footer_distance = Inches(0.25)

    normal = doc.styles["Normal"]
    normal.font.name = "Arial"
    normal._element.rPr.rFonts.set(qn("w:ascii"), "Arial")
    normal._element.rPr.rFonts.set(qn("w:hAnsi"), "Arial")
    normal.font.size = Pt(9.15)
    normal.font.color.rgb = RGBColor.from_string(INK)

    title = doc.add_paragraph()
    set_para(title, after=1, line=1.0)
    title.alignment = WD_ALIGN_PARAGRAPH.LEFT
    set_font(title.add_run("XUEHAO XU"), 21, NAVY, bold=True)
    subtitle = title.add_run("  |  Research CV")
    set_font(subtitle, 10.2, MUTED)

    contact = doc.add_paragraph()
    set_para(contact, after=4, line=1.0)
    set_font(contact.add_run(t[2]), 8.85, MUTED)
    add_bottom_border(contact, BLUE)

    add_section(doc, t[3])
    add_body(doc, "Humanoid Robot Learning; Generalizable Physical Skill Learning; Loco-Manipulation; Reinforcement Learning; Motion Priors and Imitation Learning; Perception for Physical Control; Sim-to-Real and Learned Dynamics; Contact-Rich Robot Control", after=2.5, size=9.05)

    add_section(doc, t[5])
    education = doc.add_paragraph()
    set_para(education, after=0.5, line=1.0, keep=True)
    set_font(education.add_run(t[6]), 10.0, NAVY, bold=True)
    add_body(doc, t[7], after=0.6, size=9.05, color=MUTED)
    add_body(doc, "GPA: 4.08/5.0 | Ranked 3/133 in Artificial Intelligence", after=2, size=9.05)

    add_section(doc, t[9])
    projects = [
        (
            "Learning Dynamic Skills for Humanoid Robots via Reinforcement Learning",
            "2026-Present",
            "T1 Humanoid Kicking, Locomotion, and Skill Generalization",
            [
                "Implemented and modified reinforcement-learning environments for humanoid locomotion and contact-rich kicking tasks using MuJoCo/MJLab/Warp simulation workflows.",
                "Implemented and evaluated task components including action and observation spaces, ball reset logic, contact detection, reward functions, termination conditions, and curriculum learning procedures.",
                "Conducted experiments to analyze policy behavior through contact quality, ball velocity, target direction error, post-kick recovery, and training-stability metrics.",
                "Investigating Conditional AMP and motion-prior-based policies for skill generalization across different ball positions, kicking directions, and task conditions.",
            ],
        ),
        (
            "Conditional AMP for Generalizable Humanoid Kicking",
            "2026",
            "RL Research Project",
            [
                "Investigated distance-conditioned Conditional AMP for humanoid kicking using condition vectors over target distance and kick type with curriculum learning.",
                "Studying how expert-policy condition alignment and motion priors influence training stability and cross-condition skill generalization.",
            ],
        ),
        (
            "Motion Prior Learning for Generalizable Humanoid Skills",
            "2026",
            "Research Exploration",
            [
                "Studying AMP-style motion priors, human motion data, encoder-decoder policies, and latent representations for generalizable humanoid skill learning.",
                "Exploring how motion priors can support natural, stable, and transferable behaviors without sacrificing task completion.",
            ],
        ),
        (
            t[25],
            "2026",
            "Research Project | Manuscript in Preparation | Nanjing University of Posts and Telecommunications",
            [
                t[27].lstrip("• "),
                t[28].lstrip("• "),
                "Conducted calibration experiments with ABB industrial robots and 3D sensing systems for evaluation.",
            ],
        ),
    ]
    for heading, date, subtitle, bullets in projects:
        add_project_title(doc, heading, date, subtitle)
        for bullet in bullets:
            add_bullet(doc, bullet.lstrip("• "))

    add_section(doc, t[30])
    skills = [
        "Programming: Python, C++, Git/GitHub, Linux",
        "Machine Learning / RL: PyTorch, Reinforcement Learning, PPO, reward design, curriculum learning",
        "Robot Learning: Generalizable skill learning, humanoid motion control, loco-manipulation concepts, motion imitation, AMP-style motion priors",
        "Simulation: MuJoCo, MJLab, Warp",
        "Robotics Software: ABB RAPID Programming, Robot Calibration, 3D Sensing, Point-Cloud Processing",
    ]
    for line in skills:
        label, value = line.split(":", 1)
        add_skill(doc, label, value.strip())

    add_section(doc, t[36])
    for award in t[37:40]:
        add_bullet(doc, award.lstrip("• "))

    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_para(footer, before=0, after=0, line=1.0)
    set_font(footer.add_run("Xuehao Xu | Research CV"), 7.5, MUTED)

    doc.core_properties.title = "Xuehao Xu - Research CV"
    doc.core_properties.author = "Xuehao Xu"
    doc.core_properties.subject = "Research CV"
    doc.save(OUTPUT)


if __name__ == "__main__":
    main()
