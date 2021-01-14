export enum Status {
	Initial = 'initial',
	Error = 'error',
	Loading = 'loading',
	Success = 'success',
	Downloading = 'downloading'
}

export type FileState =
	| {
			status: Status.Initial;
	  }
	| {
			status: Status.Error;
	  }
	| {
			status: Status.Loading;
	  }
	| {
			status: Status.Success;
			file: File;
			src: string;
	  }
	| {
			status: Status.Downloading;
			file: File;
			src: string;
	  };

export type FormState = {
	aspectRatioHeight: number;
	aspectRatioWidth: number;
	crop: boolean;
	format: string;
	id: string;
	lockAspectRatio: boolean;
	maxWidth?: number;
	optimize: boolean;
	preventScalingUp: boolean;
	text: string;
};

export type Results = {
	height: number;
	size: number;
	width: number;
};

export type ResultsRow = Results & {
	name: string;
};
