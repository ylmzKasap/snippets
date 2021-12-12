import random
import PySimpleGUI as sg

def gui_layout():
    layout = [
    [sg.Text(
            "",
            key='blank',
            size=(20, 4),
            font=("Cambria", "20"),
            justification="center")],
        [sg.Text(
            "Press the button to start",
            key='_status_',
            size=(40, 4),
            font=("Cambria", "30"),
            justification="center")],
        [sg.Button(
            size=(30, 4),
            button_color="firebrick4",
            button_text="New Clock",
            font=("Calibri Bold", 15))],
        ]
    return layout

sg.theme("DarkGrey10")
window = sg.Window(
        'What time is it?',
        use_default_focus=False,
        element_justification="center").Layout(gui_layout())

minutes = ['five', 'ten', 'a quarter', 'twenty', 'twenty-five', 'half past', "o'clock"]
position = ['to', 'past']
hours = [
    'one', 'two', 'three', 'four', 'five', 'six',
    'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']

while True:
    event, values = window.Read()
    clockMinute = random.choice(minutes)
    clockPosition = random.choice(position)
    clockHour = random.choice(hours)

    if clockMinute == 'half past':
        clock = f'It is {clockMinute} {clockHour}.'
    elif clockMinute == "o'clock":
        clock = f"It is {clockHour} {clockMinute}."
    else:
        clock = f'It is {clockMinute} {clockPosition} {clockHour}.'

    if event is None:
        break
    window.FindElement('_status_').Update(clock)

