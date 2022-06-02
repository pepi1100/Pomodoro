const buttons = document.querySelectorAll('.controls')

const click_sound = new Audio('click.mp3')
const bell = new Audio('bell.mp3')

const startBtn = document.getElementById('start')

const pomodoro = buttons[0]
const shortBreak = buttons[1]
const longBreak = buttons[2]

let minutes = document.getElementById('minutes')
let seconds = document.getElementById('seconds')
let countdown

const activeBtn = (e) => {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("btn-active");
    }
    e.target.classList.add("btn-active");
}

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        activeBtn(e)
    })
})


const updateClock = () => {
    if (seconds.innerHTML == 0) {
        if (minutes.innerHTML > 0) {
            if (minutes.innerHTML <= 10) {
                minutes.innerHTML = '0' + (minutes.innerHTML - 1)
            } else {
                minutes.innerHTML--
            }

            seconds.innerHTML = 59
        } else {
            if (pomodoro.classList.contains('btn-active')) {
                renewTimer(25)
            } else if (shortBreak.classList.contains('btn-active')) {
                renewTimer(5, '0')
            } else {
                renewTimer(15)
            }

            bell.play()
        }
    } else if (seconds.innerHTML <= 10) {
        seconds.innerHTML = '0' + (seconds.innerHTML - 1)
    } else {
        seconds.innerHTML--
    }
}

const renewTimer = (m, str = '') => {
    startBtn.innerHTML = 'START'
    minutes.innerHTML = str + m
    seconds.innerHTML = '0' + 0
    stopTimer()
}
const startTimer = () => {
    click_sound.play()
    startBtn.innerHTML = 'STOP'
    startBtn.style.color = 'white'
    startBtn.style.backgroundColor = '#d95550'
    countdown = window.setInterval(updateClock, 1000)
    startBtn.removeEventListener('click', startTimer)
    startBtn.addEventListener('click', stopTimer)

}
const stopTimer = () => {
    startBtn.innerHTML = 'START'
    startBtn.style.color = '#d95550'
    startBtn.style.backgroundColor = 'white'
    clearInterval(countdown)
    startBtn.removeEventListener('click', stopTimer)
    startBtn.addEventListener('click', startTimer)
}

const short = () => {
    startBtn.innerHTML = 'START'
    minutes.innerHTML = '0' + 5
    seconds.innerHTML = '0' + 0
    stopTimer()
}

const long = () => {
    startBtn.innerHTML = 'START'
    minutes.innerHTML = 15
    seconds.innerHTML = '0' + 0
    stopTimer()
}

const pomo = () => {
    renewTimer(25)
}

startBtn.addEventListener('click', startTimer)

pomodoro.addEventListener('click', pomo)

shortBreak.addEventListener('click', short)

longBreak.addEventListener('click', long)

const darkBtn = document.getElementById('darkMode')

const body = document.body

const goDark = () => {
    body.classList.toggle('darkMode')
}

darkBtn.addEventListener('click', goDark)