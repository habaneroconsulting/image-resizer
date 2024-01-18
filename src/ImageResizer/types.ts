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

export type Formats = 'jpeg' | 'png' | 'webp';

export type FormState = {
	aspectRatioHeight: number;
	aspectRatioWidth: number;
	change?: 'crop' | 'input';
	format: Formats;
	id: string;
	lockAspectRatio: boolean;
	maxWidth: number;
	optimize: boolean;
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
