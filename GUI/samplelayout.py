from pathlib import Path
import sys
import os

import PySimpleGUI as sg


def two_button_error_layout(msg1, msg2, b1, b2):
    layout = [
        [sg.Text(
            msg1,
            key='_status1_',
            justification="center",
            font=("Cambria", "16"))],
        [sg.Text(
            msg2,
            key='_status2_',
            justification="center",
            font=("Cambria", "12"))],
        [sg.Button(
            button_color=('white', 'green'),
            size=(15, 3),
            font=("Calibri", 12),
            button_text=b1),
            sg.Button(
                button_color=('white', 'firebrick4'),
                size=(15, 3), font=("Calibri", 12),
                button_text=b2)]]

    window = sg.Window(
                'Altınpınar Okul Zili',
                element_justification="center",
                icon=Path("data", "images", "error.ico")
            ).Layout(layout)

    while True:
        event, values = window.Read()
        if event in (None, b2):
            sys.exit()
        elif event == b1:
            os.startfile("Zil Saatleri.xlsx")


def main_layout():
    layout = [
        [sg.Text(
            '',
            key='_status_',
            size=(25, 3),
            font=("Cambria", "16"),
            justification="center")],
        [sg.Text(
            '',
            key='_status2_',
            size=(25, 2),
            font=("Cambria", "25"),
            justification="center")],
        [sg.Button(
            size=(15, 1),
            font=("Cambria", 11),
            button_text="Öğrenci Zili Çal"),
            sg.Button(
                size=(15, 1),
                font=("Cambria", 11),
                button_text="Öğretmen Zili Çal"),
            sg.Button(
                size=(15, 1),
                font=("Cambria", 11),
                button_text="Teneffüs Zili Çal")],
        [sg.Button(
            size=(15, 2),
            font=("Cambria", 11),
            button_color="firebrick4",
            button_text="Zili Durdur"),
            sg.Button(
                size=(15, 2),
                font=("Cambria", 11),
                button_color="RoyalBlue4",
                button_text="Zil Saatleri")]
    ]
    return layout


def bell_layout():
    layout = [
        [sg.Text(
            '',
            key='_status_',
            size=(40, 5),
            font=("Cambria", "15"),
            justification="center")],
        [sg.Button(
            size=(15, 3),
            button_color="firebrick4",
            button_text="Durdur",
            font=("Calibri", 12))],
        ]
    return layout
