/*
 * Copyright (c) 9.1.24.Tamiz
 */

import React from 'react'

const Description = () => {
    return (
        <div className={"w-full shadow-xl p-5"}>
            <h1 className={"text-2xl font-semibold"}>Specification</h1>

            <div className={"p-2 mt-5"}>
                <Card  title={"Gamdias HADES M2 Optical Gaming Mouse"} desc={"The HADES M2 optical wired/wireless gaming mouse has" +
                    " every feature of a high-end device. Built with integrated RGB lights, tough switches, a gaming-grade optical sensor, and a 500mAh" +
                    " battery with energy-saving technology for long-lasting battles."}/>
                <Card  title={"Gamdias HADES M2 Optical Gaming Mouse"} desc={"The HADES M2 optical wired/wireless gaming mouse has" +
                    " every feature of a high-end device. Built with integrated RGB lights, tough switches, a gaming-grade optical sensor, and a 500mAh" +
                    " battery with energy-saving technology for long-lasting battles."}/>
                <Card  title={"Gamdias HADES M2 Optical Gaming Mouse"} desc={"The HADES M2 optical wired/wireless gaming mouse has" +
                    " every feature of a high-end device. Built with integrated RGB lights, tough switches, a gaming-grade optical sensor, and a 500mAh" +
                    " battery with energy-saving technology for long-lasting battles."}/>
                <Card  title={"Gamdias HADES M2 Optical Gaming Mouse"} desc={"The HADES M2 optical wired/wireless gaming mouse has" +
                    " every feature of a high-end device. Built with integrated RGB lights, tough switches, a gaming-grade optical sensor, and a 500mAh" +
                    " battery with energy-saving technology for long-lasting battles."}/>
                <Card  title={"Gamdias HADES M2 Optical Gaming Mouse"} desc={"The HADES M2 optical wired/wireless gaming mouse has" +
                    " every feature of a high-end device. Built with integrated RGB lights, tough switches, a gaming-grade optical sensor, and a 500mAh" +
                    " battery with energy-saving technology for long-lasting battles."}/>
                <Card  title={"Gamdias HADES M2 Optical Gaming Mouse"} desc={"The HADES M2 optical wired/wireless gaming mouse has" +
                    " every feature of a high-end device. Built with integrated RGB lights, tough switches, a gaming-grade optical sensor, and a 500mAh" +
                    " battery with energy-saving technology for long-lasting battles."}/>
                <Card  title={"Gamdias HADES M2 Optical Gaming Mouse"} desc={"The HADES M2 optical wired/wireless gaming mouse has" +
                    " every feature of a high-end device. Built with integrated RGB lights, tough switches, a gaming-grade optical sensor, and a 500mAh" +
                    " battery with energy-saving technology for long-lasting battles."}/>
                <Card  title={"Gamdias HADES M2 Optical Gaming Mouse"} desc={"The HADES M2 optical wired/wireless gaming mouse has" +
                    " every feature of a high-end device. Built with integrated RGB lights, tough switches, a gaming-grade optical sensor, and a 500mAh" +
                    " battery with energy-saving technology for long-lasting battles."}/>
            </div>
        </div>
    )
}
export default Description

const Card = ({title , desc}) => {
    return <div className={"mt-3"}>
        <h1 className={"text-xl font-semibold"}>
            {title}
        </h1>
        <p className={"mt-1 text-sm"}>
            {desc}
        </p>
    </div>
}
