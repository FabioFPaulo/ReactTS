import { Card, CardBody } from "@heroui/react";
import { motion } from "motion/react";
import { componentData } from "./HomePage.utils";

const MotionCard = motion.create(Card);

export default function HomePage() {
    return (
        <div
            className="h-[100vh] w-[100vw] relative bg-linear-60"
            id="home"
            style={{
                background:
                    "linear-gradient(270deg, rgba(39, 39, 42, 0.95) 33.86%, #27272a 100% )",
            }}
        >
            <img
                src={`${import.meta.env.BASE_URL}images/bg.jpg`}
                alt="background"
                className="absolute -z-10 top-0 bottom-0 left-0 right-0 h-full w-full object-cover"
            />

            <div className="flex h-full relative lg:max-w-screen-xl lg:mx-auto justify-center xl:max-w-screen-2xl">
                <div className="absolute flex justify-center items-center  top-0 bottom-0 left-0 right-0 z-10 h-full text-slate-50 lg:static flex-1 lg:bg-transparent">
                    <MotionCard
                        isBlurred
                        className="border-none bg-background/20 dark:bg-default-100/50 max-w-[610px]"
                        shadow="sm"
                    >
                        <CardBody>
                            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                <div className="relative col-span-12">
                                    <div className="subtitle">
                                        {componentData.subtitle}
                                    </div>
                                    <div className="title">
                                        {componentData.title}
                                    </div>
                                    <div className="relative col-span-12"></div>
                                    <div className="relative col-span-12">
                                        {componentData.fields.map(
                                            (field, index) => (
                                                <div
                                                    className="field"
                                                    key={index}
                                                >
                                                    <div className="label">
                                                        {field.label}
                                                    </div>
                                                    <div className="value">
                                                        {field.value}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div className="relative col-span-12">
                                        <a
                                            href={`${
                                                import.meta.env.BASE_URL
                                            }files/cv.pdf`}
                                            target="_blank"
                                        >
                                            download cv
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </MotionCard>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 74 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 1.25, delay: 0.25 }}
                        className="content"
                    ></motion.div>
                </div>
            </div>
        </div>
    );
}
