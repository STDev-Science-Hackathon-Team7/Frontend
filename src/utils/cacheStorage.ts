interface CacheItem<T> {
	data: T;
	expiry: number; // 만료 시간 (타임스탬프)
}

export class CacheStorage {
	private static instance: CacheStorage;
	private cache: Record<string, CacheItem<any>> = {};

	private constructor() {}

	public static getInstance(): CacheStorage {
		if (!CacheStorage.instance) {
			CacheStorage.instance = new CacheStorage();
		}
		return CacheStorage.instance;
	}

	/**
	 * 캐시에 데이터 저장
	 * @param key 캐시 키
	 * @param data 저장할 데이터
	 * @param ttlMinutes 유효 시간(분)
	 */
	public set<T>(key: string, data: T, ttlMinutes: number = 60): void {
		const now = new Date().getTime();
		const expiry = now + ttlMinutes * 60 * 1000;

		this.cache[key] = {
			data,
			expiry
		};
	}

	/**
	 * 캐시에서 데이터 조회
	 * @param key 캐시 키
	 * @returns 캐시된 데이터 또는 null (만료된 경우)
	 */
	public get<T>(key: string): T | null {
		const item = this.cache[key];

		// 캐시 아이템이 없는 경우
		if (!item) {
			return null;
		}

		const now = new Date().getTime();

		// 캐시가 만료된 경우
		if (now > item.expiry) {
			this.remove(key);
			return null;
		}

		return item.data as T;
	}

	/**
	 * 캐시에서 데이터 삭제
	 * @param key 캐시 키
	 */
	public remove(key: string): void {
		delete this.cache[key];
	}

	/**
	 * 캐시 전체 초기화
	 */
	public clear(): void {
		this.cache = {};
	}

	/**
	 * 캐시 만료 시간 갱신
	 * @param key 캐시 키
	 * @param ttlMinutes 새로운 유효 시간(분)
	 * @returns 갱신 성공 여부
	 */
	public refresh(key: string, ttlMinutes: number = 60): boolean {
		const item = this.cache[key];

		if (!item) {
			return false;
		}

		const now = new Date().getTime();
		item.expiry = now + ttlMinutes * 60 * 1000;

		return true;
	}
}
