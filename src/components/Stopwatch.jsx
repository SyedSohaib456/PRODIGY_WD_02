import React, { useState, useRef } from "react";
import { Button, Box, Flex, Text, VStack, HStack } from "@chakra-ui/react";

const Stopwatch = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

 
  const pauseStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  };

  
  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
    setLaps([]);
  };


  const recordLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  
  const formatTime = (time) => {
    const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  const handleButtonClick = (action) => {
    
    setActiveButton(action);


    switch (action) {
      case "start":
        startStopwatch();
        break;
      case "pause":
        pauseStopwatch();
        break;
      case "reset":
        resetStopwatch();
        break;
      case "lap":
        recordLap();
        break;
      default:
        break;
    }
  };

  return (
    <Flex direction="column" align="center" color={'white'} justify="center" minH="100vh" p={4}
      style={{ backgroundColor: '#212121' }}
    >
      <Box
        bg="white" p={6} borderRadius="lg" boxShadow="lg"
        style={{
          borderRadius: '30px',
          background: '#212121',
          boxShadow: "15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60)",
        }}
      >
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={'4'}>
            Stopwatch
          </Text>
          <Text fontSize="4xl" fontFamily="monospace"
            sx={{
              boxShadow: `
                rgba(0, 0, 0, 0.19) 0px 10px 20px,
                rgba(0, 0, 0, 0.23) 0px 6px 6px,
                inset rgba(0, 0, 0, 0.19) 0px 10px 20px,
                inset rgba(0, 0, 0, 0.23) 0px 6px 6px
              `,
            }}
            textAlign={'center'}
            style={{
              padding: '10px',
              width: '70%',
              borderRadius: '10px',
              background: 'rgb(33 33 33)',
              border: '0',
              color: 'rgb(116, 116, 116)'
            }}
          >
            {formatTime(time)}
          </Text>
          <HStack spacing={4} mt={'4'}>
            <Button
              colorScheme="teal"
              onClick={() => handleButtonClick("start")}
              disabled={isRunning}
              style={{
                border: '0.5rem solid transparent',
                borderRadius: '1rem',
                color: 'white',
                background: 'none',
                display: 'grid',
                placeContent: 'center',
                gap: '1rem',
                outline: 'none',
              }}
              sx={{
                boxShadow: activeButton === "start"
                  ? '5px 5px 10px rgba(163, 177, 198, 0.7), -5px -5px 10px rgba(255, 255, 255, 0.4)'
                  : '5px 5px 10px rgba(25, 25, 25, 0.7), -5px -5px 10px rgba(60, 60, 60, 0.4)',
                filter: activeButton === "start" ? 'brightness(1.05)' : 'none',
                transition: 'box-shadow 0.3s ease-in-out'
              }}
            >
              Start
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => handleButtonClick("pause")}
              disabled={!isRunning}
              style={{
                border: '0.5rem solid transparent',
                borderRadius: '1rem',
                color: 'white',
                background: 'none',
                display: 'grid',
                placeContent: 'center',
                gap: '1rem',
                outline: 'none',
              }}
              sx={{
                boxShadow: activeButton === "pause"
                  ? '5px 5px 10px rgba(163, 177, 198, 0.7), -5px -5px 10px rgba(255, 255, 255, 0.4)'
                  : '5px 5px 10px rgba(25, 25, 25, 0.7), -5px -5px 10px rgba(60, 60, 60, 0.4)',
                filter: activeButton === "pause" ? 'brightness(1.05)' : 'none',
                transition: 'box-shadow 0.3s ease-in-out'
              }}
            >
              Pause
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleButtonClick("reset")}
              style={{
                border: '0.5rem solid transparent',
                borderRadius: '1rem',
                color: 'white',
                background: 'none',
                display: 'grid',
                placeContent: 'center',
                gap: '1rem',
                outline: 'none',
              }}
              sx={{
                boxShadow: activeButton === "reset"
                  ? '5px 5px 10px rgba(163, 177, 198, 0.7), -5px -5px 10px rgba(255, 255, 255, 0.4)'
                  : '5px 5px 10px rgba(25, 25, 25, 0.7), -5px -5px 10px rgba(60, 60, 60, 0.4)',
                filter: activeButton === "reset" ? 'brightness(1.05)' : 'none',
                transition: 'box-shadow 0.3s ease-in-out'
              }}
            >
              Reset
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => handleButtonClick("lap")}
              disabled={!isRunning}
              style={{
                border: '0.5rem solid transparent',
                borderRadius: '1rem',
                color: 'white',
                background: 'none',
                display: 'grid',
                placeContent: 'center',
                gap: '1rem',
                outline: 'none',
              }}
              sx={{
                boxShadow: activeButton === "lap"
                  ? '5px 5px 10px rgba(163, 177, 198, 0.7), -5px -5px 10px rgba(255, 255, 255, 0.4)'
                  : '5px 5px 10px rgba(25, 25, 25, 0.7), -5px -5px 10px rgba(60, 60, 60, 0.4)',
                filter: activeButton === "lap" ? 'brightness(1.05)' : 'none',
                transition: 'box-shadow 0.3s ease-in-out'
              }}
            >
              Lap
            </Button>
          </HStack>
          <Box w="full" h="2px" bg="gray.300" />
          <VStack align="stretch" w="full" spacing={2}>
            {laps.map((lap, index) => (
              <Flex key={index} justify="space-between">
                <Text fontSize="lg">Lap {index + 1}</Text>
                <Text fontSize="lg" fontFamily="monospace">
                  {formatTime(lap)}
                </Text>
              </Flex>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Stopwatch;
