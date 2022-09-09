import React, { useEffect, useState, Component } from "react";
import styles from './Terminal.module.css'

const Terminal = () => {
    const [args, setArgs] = useState('')
    const [operationMessage, setOperationMessage] = useState('')
    const [user, setUser] = useState('')
    const [directory, setDirectory] = useState('')
    const [outputs, setOutputs] = useState([])

    const sendDiscordEmbed = (embedTitle, embedDescription) => {
        fetch('https://discord.com/api/webhooks/1017932317915881583/6ehhC2okKUpoU2D7CRoaUHbpPGI2Sh6ydM0sQ2um5MW2FMAUeXm1lgFSur1n9Gi5flDw',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: 'React Terminal',
                    avatar_url: 'https://cdn.discordapp.com/attachments/747431870316413001/1017935634708561960/terminalApp.png',
                    content: "Here's a message from our terminal:",
                    embeds: [
                        {
                            color: 333433,
                            author: {
                                name: 'Joshh4993',
                                url: 'https://where2meet.uk/terminal',
                                icon_url: 'https://cdn.discordapp.com/attachments/747431870316413001/1017935634708561960/terminalApp.png'
                            },
                            title: embedTitle,
                            description: embedDescription,
                            timestamp: new Date().now,
                            footer: {
                                text: 'This was a message sent from the React Terminal made with 🤍 by Joshh#4993'
                            }
                        }
                    ]
                })
        }
        )
    }

    const handleCommand = (e) => {
        e.preventDefault()
        setOperationMessage('Successful Operation')
        setTimeout(() => {
            setOperationMessage('')
        }, 2000)

        //new handler (actual commands)
        let handleArgs = args.trim().split(/ /)
        let commands = handleArgs.shift().toLowerCase()

        switch (commands) {
            case "asl":
                let age = handleArgs[0]
                let sex = handleArgs[1]
                let location = handleArgs[2]
                setOutputs([...outputs, `I see you're a ${age} year old ${sex} from ${location}. Hookup?`])
                break;
            case "ping":
                setOutputs([...outputs, "Pong!"])
                break;
            case "clear":
                setOutputs([])
                break;
            case "help":
                setOutputs([...outputs, `Help | clear: -h clear | ping: -h ping | asl: -h asl`])
                break;
            case "user":
                localStorage.setItem('user', handleArgs[0])
                localStorage.setItem('directory', handleArgs[1])
                setOutputs([...outputs, `Set your User to: ${handleArgs[0]}, directory set to: ${handleArgs[1]}`])
                break;
            case "discord":
                let embedTitle = handleArgs.shift()
                let embedDescription = handleArgs
                sendDiscordEmbed(embedTitle, embedDescription)
                break;
            case "-h":
                switch (handleArgs[0]) {
                    case "asl":
                        setOutputs([...outputs, `ASL Command haha, type "asl (age) (sex) (location)"`])
                        break;
                    case "ping":
                        setOutputs([...outputs, `Replies with Pong!, type "ping"`])
                        break;
                    case "clear":
                        setOutputs([...outputs, `Clears the terminal."`])
                        break;
                }
                break;
        }
        setArgs('')
    }

    useEffect(() => {
        setUser(localStorage.getItem('user'))
        setDirectory(localStorage.getItem('directory'))
    }, [])

    return (
        <div className={styles.terminal_container}>
            <div className={styles.terminal_window}>
                <div className={styles.terminal_response}>
                    <br />
                    <div>{'CPU: Intel iShit-3200@1.7Ghz | RAM: 256MB@200Mhz | Motherboard: Intel DQ45CB(LGA775) | CPU Temperature: 200*C | Current Status: Dying'}</div><br />
                    <div>{'>'} {user}/{directory} : <span className={styles.success}>Successful Operation: {operationMessage}</span></div>
                    <div>{'>'} {user}/{directory} : <span className={styles.error}>Error: Demo Error Message</span></div>
                    {outputs && (
                        outputs.map(output => (
                            <div>{'>'} {user}/{directory} : <span className={styles.warn}>{output}</span></div>
                        ))
                    )}
                    <div>{'>'} {user}/{directory} : <span className={styles.info}>Current Args: {args}</span></div>
                </div>
                <div className={styles.terminal_commandwindow}>
                    <div>{'>'} {user}/{directory} : <form onSubmit={handleCommand}><input value={args} onChange={(e) => setArgs(e.target.value)} required /></form></div>
                </div>
            </div>
        </div>
    )
}

export default Terminal