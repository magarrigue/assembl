// @flow

import { isDateExpired, getNumberOfDays, calculatePercentage } from './globalFunctions';
import { PHASES } from '../constants';

type Phase = {
  id: string,
  identifier: string,
  isThematicsTable: boolean,
  start: string,
  end: string,
  image: File,
  title: string,
  description: string
};
export type Timeline = Array<Phase>;

const dateComparator = (phase1, phase2) => {
  if (phase1.end === phase2.end) {
    return 0;
  }
  if (phase1.end < phase2.end) {
    return -1;
  }
  return 1;
};

export const getIsDebateStarted = (_timeline: Timeline) => {
  let timeline = _timeline;
  if (!timeline) {
    timeline = [];
  }
  const currentDate = new Date();
  return timeline.map(phase => new Date(phase.start)).some(startDate => currentDate >= startDate);
};

export const getCurrentPhase = (_timeline: Timeline) => {
  let timeline = _timeline;
  if (!timeline) {
    timeline = [];
  }

  const currentDate = new Date();
  let currentPhase = null;
  timeline.forEach((phase) => {
    const startDate = new Date(phase.start);
    const endDate = new Date(phase.end);
    if (currentDate >= startDate && currentDate < endDate) {
      currentPhase = phase;
    }
  });
  if (currentPhase) {
    return currentPhase;
  }
  // if all phases are closed, take the last closed phase
  const sortedTimeline = [...timeline].sort(dateComparator);
  return sortedTimeline[sortedTimeline.length - 1];
};

export const getCurrentPhaseData = (_timeline: Timeline) => {
  const currentPhase = getCurrentPhase(_timeline);
  if (currentPhase) {
    return {
      currentPhaseIdentifier: currentPhase.identifier,
      currentPhaseId: currentPhase.id
    };
  }
  return {
    currentPhaseIdentifier: PHASES.thread,
    currentPhaseId: ''
  };
};

export const isPhaseStarted = (_timeline: Timeline, _identifier: string) => {
  let timeline = _timeline;
  const identifier = _identifier;
  if (!timeline) {
    timeline = [];
  }
  const currentDate = new Date();
  let isStarted = false;
  timeline.forEach((phase) => {
    if (phase.identifier === identifier) {
      const startDate = new Date(phase.start);
      isStarted = isDateExpired(currentDate, startDate);
    }
  });
  return isStarted;
};

let key = '';
export const isSeveralIdentifiers = (_timeline: Timeline) => {
  let timeline = _timeline;
  if (!timeline) {
    timeline = [];
  }
  let isSeveral = false;
  timeline.forEach((phase) => {
    if (key !== phase.identifier && key !== '') {
      isSeveral = true;
    }
    key = phase.identifier;
  });
  return isSeveral;
};

export const getPhaseStatus = (_startDate: string, _endDate: string) => {
  const startDate = new Date(_startDate);
  const endDate = new Date(_endDate);
  const currentDate = new Date();
  let phaseStatus = '';
  if (currentDate < startDate && currentDate < endDate) {
    phaseStatus = 'notStarted';
  }
  if (currentDate > startDate && currentDate < endDate) {
    phaseStatus = 'inProgress';
  }
  if (currentDate > startDate && currentDate > endDate) {
    phaseStatus = 'completed';
  }
  return phaseStatus;
};

export const getStartDatePhase = (_timeline: Timeline, _identifier: string) => {
  let timeline = _timeline;
  if (!timeline) {
    timeline = [];
  }
  const identifier = _identifier;
  let startDatePhase = '';
  timeline.forEach((phase) => {
    if (phase.identifier === identifier) {
      startDatePhase = phase.start;
    }
  });
  return startDatePhase;
};

export const isCurrentPhase = (_phase: Phase) => {
  const phase = _phase;
  const currentDate = new Date();
  const startDate = new Date(phase.start);
  const endDate = new Date(phase.end);
  const currentPhase = isDateExpired(currentDate, startDate) && isDateExpired(endDate, currentDate);
  return currentPhase;
};

export const getPhaseName = (_timeline: Timeline, _id: string) => {
  const timeline = _timeline;
  const phaseId = _id;
  let phaseName = '';
  if (!phaseId || !timeline) return phaseName;
  timeline.forEach((phase) => {
    if (phase.id === phaseId) {
      phaseName = phase.title;
    }
  });
  return phaseName;
};

export const isStepCompleted = (_phase: Phase) => {
  const phase = _phase;
  const currentDate = new Date();
  const endDate = new Date(phase.end);
  return isDateExpired(currentDate, endDate);
};

export const getIfPhaseCompletedById = (_timeline: Timeline, _id: string) => {
  const timeline = _timeline;
  const phaseId = _id;
  let isPhaseCompleted = false;
  if (!phaseId || !timeline) return isPhaseCompleted;
  timeline.forEach((phase) => {
    if (phaseId === phase.id) {
      isPhaseCompleted = isStepCompleted(phase);
    }
  });
  return isPhaseCompleted;
};

export const getBarPercent = (_phase: Phase) => {
  const phase = _phase;
  const currentDate = new Date();
  const endDate = new Date(phase.end);
  const stepCompleted = isDateExpired(currentDate, endDate);
  let barWidth = 0;
  if (stepCompleted) {
    barWidth = 100;
  } else {
    const startDate = new Date(phase.start);
    const isStepStarted = isDateExpired(currentDate, startDate);
    if (isStepStarted) {
      const remainingDays = getNumberOfDays(endDate, currentDate);
      const totalDays = getNumberOfDays(endDate, startDate);
      const percentage = calculatePercentage(remainingDays, totalDays);
      barWidth = 100 - percentage;
    }
  }
  return barWidth;
};

export const getPhaseId = (_timeline: Timeline, identifier: string) => {
  let timeline = _timeline;
  if (!timeline) {
    timeline = [];
  }
  const phase = timeline.find(p => p.identifier === identifier);
  const phaseId = phase && phase.id;
  return phaseId;
};

export const getPhaseById = (_timeline: Timeline, id: string) => {
  let timeline = _timeline;
  if (!timeline) {
    timeline = [];
  }
  const phase = timeline.find(p => p.id === id);
  return phase;
};

// TODO an other solution... The solution must be independent
export const getDisplayedPhaseIdentifier = (routerParams: RouterParams) => (routerParams ? routerParams.phase : null);