const controlLuas = document.getElementById('control_luas');
const controlKeliling = document.getElementById('control_keliling');
const operasiContainer = document.querySelector('.operasi');

const operations = [
	{
		type: 'luas',
		rumus: 'L = 1/2 x a x t',
		keterangan: [
			{ nama: 'L = Luas' },
			{ nama: 'a = Panjang alas' },
			{ nama: 't = Tinggi' },
		],
	},
	{
		type: 'keliling',
		rumus: 'K = S1 + S2 + S3',
		keterangan: [
			{ nama: 'K = Keliling' },
			{ nama: 'S1 = sisi a' },
			{ nama: 'S2 = sisi b' },
			{ nama: 'S3 = sisi c' },
		],
	},
];

function renderRumusDanKeterangan(type) {
	const rumusDanKeterangan = document.querySelector('.rumus_dan_keterangan');
	const rumus = createRumus(type);
	rumusDanKeterangan.innerHTML = rumus;

	const keteranganContainer = document.querySelector('.keterangan');
	const keteranganItem = createKeteranganItem(type.keterangan);
	keteranganContainer.innerHTML = keteranganItem.join('');
}

function createRumus({ rumus, type }) {
	return `
	<p class="judul_rumus">Rumus ${type} segitiga yaitu:</p>
	<p class="rumus">${rumus}</p>
	<p>Dimana:</p>
	<ul class="keterangan"></ul>
	`;
}

function createKeteranganItem(keterangan) {
	return keterangan.map(k => {
		return `
		<li>
			<p>${k.nama}</p>
		</li>
		`;
	});
}

function createFormLuas() {
	return `
	<h2>Hitung Luas Segitiga</h2>
	<form>
		<input required min='1' type="number" name="alas" placeholder="Nilai Alas" />
		<input required min='1' type="number" name="tinggi" placeholder="Nilai Tinggi" />
		<ul class="operasi_hasil">
		</ul>
		<button type="submit">Hitung</button>
		<button type="reset">Reset</button>
	</form>
	`;
}

function createFormKeliling() {
	return `
	<h2>Hitung Keliling Segitiga</h2>
	<form>
		<input required min='1' type="number" name="sisiA" placeholder="Sisi a" />
		<input required min='1' type="number" name="sisiB" placeholder="Sisi b" />
		<input required min='1' type="number" name="sisiC" placeholder="Sisi c" />
		<ul class="operasi_hasil">
		</ul>
		<button type="submit">Hitung</button>
		<button type="reset">Reset</button>
	</form>
	`;
}

function renderTemplateLuas(luas) {
	renderRumusDanKeterangan(luas);
	const formLuas = createFormLuas();
	operasiContainer.innerHTML = formLuas;
	const form = document.querySelector('form');
	const resetButton = form.querySelector('button[type="reset"]');
	const hasilContainer = form.querySelector('.operasi_hasil');
	form.addEventListener('submit', e => {
		e.preventDefault();
		const luasFormData = new FormData(e.target);
		hasilContainer.style.display = 'block';
		const luasData = {};
		for (const [key, value] of luasFormData.entries()) {
			luasData[key] = Number(value);
		}
		hasilContainer.innerHTML = `
		<li><p>${luas.rumus}</p></li>
		<li><p>L = 1/2 x ${luasData.alas} x ${luasData.tinggi}</p></li>
		<li><p>L = ${(1 / 2) * luasData.alas * luasData.tinggi}</p></li>
		`;
	});
	resetButton.addEventListener('click', () => {
		hasilContainer.style.display = 'none';
	});
}

function renderTemplateKeliling(keliling) {
	renderRumusDanKeterangan(keliling);
	const formKeliling = createFormKeliling();
	operasiContainer.innerHTML = formKeliling;
	const form = document.querySelector('form');
	const resetButton = form.querySelector('button[type="reset"]');
	const hasilContainer = form.querySelector('.operasi_hasil');
	form.addEventListener('submit', e => {
		e.preventDefault();
		const kelilingFormData = new FormData(e.target);
		hasilContainer.style.display = 'block';
		const kelilingData = {};
		for (const [key, value] of kelilingFormData.entries()) {
			kelilingData[key] = Number(value);
		}
		hasilContainer.innerHTML = `
		<li><p>${keliling.rumus}</p></li>
		<li><p>K = ${kelilingData.sisiA} + ${kelilingData.sisiB} + ${
			kelilingData.sisiC
		}</p></li>
		<li><p>K = ${
			kelilingData.sisiA + kelilingData.sisiB + kelilingData.sisiC
		}</p></li>
		`;
	});
	resetButton.addEventListener('click', () => {
		hasilContainer.style.display = 'none';
	});
}

controlLuas.addEventListener('click', function () {
	controlKeliling.removeAttribute('data-active');
	controlLuas.setAttribute('data-active', 'active');
	renderTemplateLuas(operations[0]);
});

controlKeliling.addEventListener('click', function () {
	controlLuas.removeAttribute('data-active');
	controlKeliling.setAttribute('data-active', 'active');
	renderTemplateKeliling(operations[1]);
});

window.addEventListener('load', function () {
	renderTemplateLuas(operations[0]);
});
