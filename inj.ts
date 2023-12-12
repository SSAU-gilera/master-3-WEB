/* eslint-disable @typescript-eslint/no-explicit-any */
const instanceMap = new Map<string, any>();

function Injectable({ key }: { key: string }) {
	return function (constructor: any) {
		const instance = new constructor();
		instanceMap.set(key, instance);
	};
}

function Inject(key: string) {
	return function (target: any, propertyKey: string) {
		Object.defineProperty(target, propertyKey, {
			get: () => instanceMap.get(key)
		});
	};
}

@Injectable({ key: "TestInjectable" })
class TestInjectable {
	constructor() {
		console.log('TestInjectable instance created');
	}

	public getMessage(): string {
		return "Hello from TestInjectable!";
	}
}

class TestInject {
	@Inject("TestInjectable")
	public testedField: TestInjectable;

	public print(): void {
		console.log("TestInject.print() called");
		const message = this.testedField.getMessage();
		console.log(message);
	}
}


document.addEventListener('DOMContentLoaded', () => {
	const testInstance = new TestInject();
	testInstance.print();
	document.getElementById('testResult').textContent = `Результат: ${testInstance.testedField.getMessage()}`;
});
