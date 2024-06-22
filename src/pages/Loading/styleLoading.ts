import styled from 'styled-components';
import { redHalley } from '../../utils/colors';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20% auto;

    .loader3 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle1 {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 10px;
  background-color: ${redHalley};
  animation: circle1 1s ease-in-out infinite;
}

.circle1:nth-child(2) {
  animation-delay: 0.2s;
}

.circle1:nth-child(3) {
  animation-delay: 0.4s;
}

.circle1:nth-child(4) {
  animation-delay: 0.6s;
}

.circle1:nth-child(5) {
  animation-delay: 0.8s;
}

@keyframes circle1 {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

`;