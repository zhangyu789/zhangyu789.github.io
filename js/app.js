// --- 音效系统 ---
const soundEffects = {
    click: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'),
    correct: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'),
    wrong: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'),
    success: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT')
};

function playSound(soundName) {
    try {
    if (soundEffects[soundName]) {
        soundEffects[soundName].currentTime = 0;
            soundEffects[soundName].play().catch(e => {
                console.log('Sound play failed:', e);
                // 静默失败，不影响用户体验
            });
        }
    } catch (error) {
        console.log('Sound system error:', error);
    }
}

// --- 学习进度系统 ---
const learningProgress = {
    totalWords: 0,
    learnedWords: new Set(),
    correctAnswers: 0,
    totalAttempts: 0,
    
    init() {
        this.totalWords = vocabulary.length;
        this.loadProgress();
    },
    
    markWordLearned(wordId) {
        this.learnedWords.add(wordId);
        this.saveProgress();
        updateProgressDisplay();
    },
    
    recordAnswer(isCorrect) {
        this.totalAttempts++;
        if (isCorrect) {
            this.correctAnswers++;
        }
        this.saveProgress();
        updateProgressDisplay();
    },
    
    getProgressPercentage() {
        return Math.round((this.learnedWords.size / this.totalWords) * 100);
    },
    
    getAccuracyPercentage() {
        return this.totalAttempts > 0 ? Math.round((this.correctAnswers / this.totalAttempts) * 100) : 0;
    },
    
    saveProgress() {
        localStorage.setItem('learningProgress', JSON.stringify({
            learnedWords: Array.from(this.learnedWords),
            correctAnswers: this.correctAnswers,
            totalAttempts: this.totalAttempts
        }));
    },
    
    loadProgress() {
        const saved = localStorage.getItem('learningProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.learnedWords = new Set(data.learnedWords || []);
            this.correctAnswers = data.correctAnswers || 0;
            this.totalAttempts = data.totalAttempts || 0;
        }
    }
};

// --- 奖励系统 ---
const rewardSystem = {
    stars: 0,
    badges: [],
    
    init() {
        this.loadRewards();
    },
    
    giveStar() {
        this.stars++;
        this.saveRewards();
        this.showStarAnimation();
        updateProgressDisplay();
    },
    
    checkBadges() {
        const progress = learningProgress.getProgressPercentage();
        const accuracy = learningProgress.getAccuracyPercentage();
        
        if (progress >= 25 && !this.badges.includes('first_steps')) {
            this.badges.push('first_steps');
            this.showBadgeNotification('first_steps', '迈出第一步！');
        }
        if (progress >= 50 && !this.badges.includes('half_way')) {
            this.badges.push('half_way');
            this.showBadgeNotification('half_way', '学习小能手！');
        }
        if (progress >= 100 && !this.badges.includes('master')) {
            this.badges.push('master');
            this.showBadgeNotification('master', '英语小达人！');
        }
        if (accuracy >= 90 && !this.badges.includes('accuracy_master')) {
            this.badges.push('accuracy_master');
            this.showBadgeNotification('accuracy_master', '准确率大师！');
        }
    },
    
    showStarAnimation() {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            z-index: 1000;
            animation: starPop 1s ease-out forwards;
            pointer-events: none;
        `;
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 1000);
    },
    
    showBadgeNotification(badgeId, message) {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="background: linear-gradient(45deg, #ffd700, #ffed4e); padding: 1rem; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏆</div>
                <div style="font-weight: bold; color: #333;">${message}</div>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            z-index: 1000;
            animation: slideInRight 0.5s ease-out;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    },
    
    saveRewards() {
        localStorage.setItem('rewards', JSON.stringify({
            stars: this.stars,
            badges: this.badges
        }));
    },
    
    loadRewards() {
        const saved = localStorage.getItem('rewards');
        if (saved) {
            const data = JSON.parse(saved);
            this.stars = data.stars || 0;
            this.badges = data.badges || [];
        }
    }
};

// --- 进度显示更新 ---
function updateProgressDisplay() {
    const progressIndicator = document.getElementById('progress-indicator');
    const progressText = document.getElementById('progress-text');
    const starCounter = document.getElementById('star-counter');
    const starText = document.getElementById('star-text');
    
    if (progressIndicator && progressText) {
        const progress = learningProgress.getProgressPercentage();
        const accuracy = learningProgress.getAccuracyPercentage();
        
        if (progress > 0) {
            progressIndicator.classList.remove('hidden');
            progressText.textContent = `学习进度: ${progress}% (准确率: ${accuracy}%)`;
        } else {
            progressIndicator.classList.add('hidden');
        }
    }
    
    if (starCounter && starText) {
        starText.textContent = `⭐ ${rewardSystem.stars}`;
    }
}

// --- 词汇数据 ---
const vocabulary = [
    // 水果 (fruits) - 最常用50个
    { id: 'apple', english: 'apple', chinese: '苹果', phonetic: '/ˈæp.əl/', themeId: 'fruits', imageUrl: '/images/fruits/apple.png', example: 'I eat an apple.' },
    { id: 'banana', english: 'banana', chinese: '香蕉', phonetic: '/bəˈnænə/', themeId: 'fruits', imageUrl: '/images/fruits/banana.png', example: 'The banana is yellow.' },
    { id: 'orange', english: 'orange', chinese: '橙子', phonetic: '/ˈɔːr.ɪndʒ/', themeId: 'fruits', imageUrl: '/images/fruits/orange.png', example: 'I like orange juice.' },
    { id: 'grape', english: 'grape', chinese: '葡萄', phonetic: '/ɡreɪp/', themeId: 'fruits', imageUrl: '/images/fruits/grape.png', example: 'Grapes are sweet.' },
    { id: 'strawberry', english: 'strawberry', chinese: '草莓', phonetic: '/ˈstrɔː.bər.i/', themeId: 'fruits', imageUrl: '/images/fruits/strawberry.png', example: 'Strawberries are red.' },
    { id: 'watermelon', english: 'watermelon', chinese: '西瓜', phonetic: '/ˈwɔː.tər.mel.ən/', themeId: 'fruits', imageUrl: '/images/fruits/watermelon.png', example: 'Watermelon is juicy.' },
    { id: 'pear', english: 'pear', chinese: '梨', phonetic: '/per/', themeId: 'fruits', imageUrl: '/images/fruits/pear.png', example: 'The pear is sweet.' },
    { id: 'peach', english: 'peach', chinese: '桃子', phonetic: '/piːtʃ/', themeId: 'fruits', imageUrl: '/images/fruits/peach.png', example: 'Peaches are soft.' },
    { id: 'cherry', english: 'cherry', chinese: '樱桃', phonetic: '/ˈtʃer.i/', themeId: 'fruits', imageUrl: '/images/fruits/cherry.png', example: 'Cherries are small.' },
    { id: 'pineapple', english: 'pineapple', chinese: '菠萝', phonetic: '/ˈpaɪn.æp.əl/', themeId: 'fruits', imageUrl: '/images/fruits/pineapple.png', example: 'Pineapple is tropical.' },
    { id: 'mango', english: 'mango', chinese: '芒果', phonetic: '/ˈmæŋ.ɡoʊ/', themeId: 'fruits', imageUrl: '/images/fruits/mango.png', example: 'Mango is delicious.' },
    { id: 'kiwi', english: 'kiwi', chinese: '猕猴桃', phonetic: '/ˈkiː.wi/', themeId: 'fruits', imageUrl: '/images/fruits/kiwi.png', example: 'Kiwi is green inside.' },
    { id: 'lemon', english: 'lemon', chinese: '柠檬', phonetic: '/ˈlem.ən/', themeId: 'fruits', imageUrl: '/images/fruits/lemon.png', example: 'Lemon is sour.' },
    { id: 'lime', english: 'lime', chinese: '青柠', phonetic: '/laɪm/', themeId: 'fruits', imageUrl: '/images/fruits/lime.png', example: 'Lime is green.' },
    { id: 'coconut', english: 'coconut', chinese: '椰子', phonetic: '/ˈkoʊ.kə.nʌt/', themeId: 'fruits', imageUrl: '/images/fruits/coconut.png', example: 'Coconut has milk.' },
    { id: 'avocado', english: 'avocado', chinese: '牛油果', phonetic: '/ˌæv.əˈkɑː.doʊ/', themeId: 'fruits', imageUrl: '/images/fruits/avocado.png', example: 'Avocado is healthy.' },
    { id: 'blueberry', english: 'blueberry', chinese: '蓝莓', phonetic: '/ˈbluː.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/blueberry.png', example: 'Blueberries are tiny.' },
    { id: 'blackberry', english: 'blackberry', chinese: '黑莓', phonetic: '/ˈblæk.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/blackberry.png', example: 'Blackberries are dark.' },
    { id: 'raspberry', english: 'raspberry', chinese: '覆盆子', phonetic: '/ˈræz.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/raspberry.png', example: 'Raspberries are red.' },
    { id: 'plum', english: 'plum', chinese: '李子', phonetic: '/plʌm/', themeId: 'fruits', imageUrl: '/images/fruits/plum.png', example: 'Plums are purple.' },
    { id: 'apricot', english: 'apricot', chinese: '杏', phonetic: '/ˈeɪ.prɪ.kɑːt/', themeId: 'fruits', imageUrl: '/images/fruits/apricot.png', example: 'Apricots are orange.' },
    { id: 'fig', english: 'fig', chinese: '无花果', phonetic: '/fɪɡ/', themeId: 'fruits', imageUrl: '/images/fruits/fig.png', example: 'Figs are sweet.' },
    { id: 'pomegranate', english: 'pomegranate', chinese: '石榴', phonetic: '/ˈpɑː.mɪ.ɡræn.ɪt/', themeId: 'fruits', imageUrl: '/images/fruits/pomegranate.png', example: 'Pomegranate has seeds.' },
    { id: 'papaya', english: 'papaya', chinese: '木瓜', phonetic: '/pəˈpaɪ.ə/', themeId: 'fruits', imageUrl: '/images/fruits/papaya.png', example: 'Papaya is tropical.' },
    { id: 'cantaloupe', english: 'cantaloupe', chinese: '哈密瓜', phonetic: '/ˈkæn.tə.loʊp/', themeId: 'fruits', imageUrl: '/images/fruits/cantaloupe.png', example: 'Cantaloupe is sweet.' },
    { id: 'honeydew', english: 'honeydew', chinese: '蜜瓜', phonetic: '/ˈhʌn.i.duː/', themeId: 'fruits', imageUrl: '/images/fruits/honeydew.png', example: 'Honeydew is green.' },
    { id: 'grapefruit', english: 'grapefruit', chinese: '柚子', phonetic: '/ˈɡreɪp.fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/grapefruit.png', example: 'Grapefruit is citrus.' },
    { id: 'cranberry', english: 'cranberry', chinese: '蔓越莓', phonetic: '/ˈkræn.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/cranberry.png', example: 'Cranberries are tart.' },
    { id: 'date', english: 'date', chinese: '枣', phonetic: '/deɪt/', themeId: 'fruits', imageUrl: '/images/fruits/date.png', example: 'Dates are sweet and chewy.' },
    { id: 'elderberry', english: 'elderberry', chinese: '接骨木莓', phonetic: '/ˈel.dər.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/elderberry.png', example: 'Elderberries are small and dark.' },
    { id: 'gooseberry', english: 'gooseberry', chinese: '醋栗', phonetic: '/ˈɡuːs.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/gooseberry.png', example: 'Gooseberries are green and sour.' },
    { id: 'guava', english: 'guava', chinese: '番石榴', phonetic: '/ˈɡwɑː.və/', themeId: 'fruits', imageUrl: '/images/fruits/guava.png', example: 'Guava is tropical fruit.' },
    { id: 'jackfruit', english: 'jackfruit', chinese: '菠萝蜜', phonetic: '/ˈdʒæk.fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/jackfruit.png', example: 'Jackfruit is very large.' },
    { id: 'lychee', english: 'lychee', chinese: '荔枝', phonetic: '/ˈliː.tʃiː/', themeId: 'fruits', imageUrl: '/images/fruits/lychee.png', example: 'Lychee is sweet and juicy.' },
    { id: 'mandarin', english: 'mandarin', chinese: '橘子', phonetic: '/ˈmæn.dər.ɪn/', themeId: 'fruits', imageUrl: '/images/fruits/mandarin.png', example: 'Mandarin is like a small orange.' },
    { id: 'mulberry', english: 'mulberry', chinese: '桑葚', phonetic: '/ˈmʌl.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/mulberry.png', example: 'Mulberries grow on trees.' },
    { id: 'passion fruit', english: 'passion fruit', chinese: '百香果', phonetic: '/ˈpæʃ.ən fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/passion-fruit.png', example: 'Passion fruit is exotic.' },
    { id: 'persimmon', english: 'persimmon', chinese: '柿子', phonetic: '/pərˈsɪm.ən/', themeId: 'fruits', imageUrl: '/images/fruits/persimmon.png', example: 'Persimmon is orange fruit.' },
    { id: 'pomelo', english: 'pomelo', chinese: '柚子', phonetic: '/ˈpɑː.mə.loʊ/', themeId: 'fruits', imageUrl: '/images/fruits/pomelo.png', example: 'Pomelo is like grapefruit.' },
    { id: 'quince', english: 'quince', chinese: '榅桲', phonetic: '/kwɪns/', themeId: 'fruits', imageUrl: '/images/fruits/quince.png', example: 'Quince is hard and yellow.' },
    { id: 'star fruit', english: 'star fruit', chinese: '杨桃', phonetic: '/stɑːr fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/star-fruit.png', example: 'Star fruit looks like a star.' },
    { id: 'tamarind', english: 'tamarind', chinese: '罗望子', phonetic: '/ˈtæm.ə.rɪnd/', themeId: 'fruits', imageUrl: '/images/fruits/tamarind.png', example: 'Tamarind is sour and sweet.' },
    { id: 'tangerine', english: 'tangerine', chinese: '柑橘', phonetic: '/ˌtæn.dʒəˈriːn/', themeId: 'fruits', imageUrl: '/images/fruits/tangerine.png', example: 'Tangerine is easy to peel.' },
    { id: 'ugli fruit', english: 'ugli fruit', chinese: '丑橘', phonetic: '/ˈʌɡ.li fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/ugli-fruit.png', example: 'Ugli fruit is not pretty but tasty.' },
    { id: 'white grape', english: 'white grape', chinese: '白葡萄', phonetic: '/waɪt ɡreɪp/', themeId: 'fruits', imageUrl: '/images/fruits/white-grape.png', example: 'White grapes are green or yellow.' },
    { id: 'yellow peach', english: 'yellow peach', chinese: '黄桃', phonetic: '/ˈjel.oʊ piːtʃ/', themeId: 'fruits', imageUrl: '/images/fruits/yellow-peach.png', example: 'Yellow peach is sweet and juicy.' },
    { id: 'zucchini', english: 'zucchini', chinese: '西葫芦', phonetic: '/zuˈkiː.ni/', themeId: 'fruits', imageUrl: '/images/fruits/zucchini.png', example: 'Zucchini is green vegetable fruit.' },
    { id: 'dragon fruit', english: 'dragon fruit', chinese: '火龙果', phonetic: '/ˈdræɡ.ən fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/dragon-fruit.png', example: 'Dragon fruit is pink and white.' },
    { id: 'durian', english: 'durian', chinese: '榴莲', phonetic: '/ˈdʊr.i.ən/', themeId: 'fruits', imageUrl: '/images/fruits/durian.png', example: 'Durian has a strong smell.' },
    { id: 'rambutan', english: 'rambutan', chinese: '红毛丹', phonetic: '/ræmˈbuː.tən/', themeId: 'fruits', imageUrl: '/images/fruits/rambutan.png', example: 'Rambutan is hairy fruit.' },
    { id: 'mangosteen', english: 'mangosteen', chinese: '山竹', phonetic: '/ˈmæŋ.ɡoʊ.stiːn/', themeId: 'fruits', imageUrl: '/images/fruits/mangosteen.png', example: 'Mangosteen is purple fruit.' },
    { id: 'longan', english: 'longan', chinese: '龙眼', phonetic: '/ˈlɑːŋ.ɡən/', themeId: 'fruits', imageUrl: '/images/fruits/longan.png', example: 'Longan is like lychee.' },
    { id: 'custard apple', english: 'custard apple', chinese: '释迦', phonetic: '/ˈkʌs.tərd ˈæp.əl/', themeId: 'fruits', imageUrl: '/images/fruits/custard-apple.png', example: 'Custard apple is creamy fruit.' },
    { id: 'breadfruit', english: 'breadfruit', chinese: '面包果', phonetic: '/ˈbred.fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/breadfruit.png', example: 'Breadfruit is starchy fruit.' },
    { id: 'plantain', english: 'plantain', chinese: '大蕉', phonetic: '/ˈplæn.tɪn/', themeId: 'fruits', imageUrl: '/images/fruits/plantain.png', example: 'Plantain is like banana but bigger.' },
    { id: 'soursop', english: 'soursop', chinese: '刺果番荔枝', phonetic: '/ˈsaʊr.sɑːp/', themeId: 'fruits', imageUrl: '/images/fruits/soursop.png', example: 'Soursop is green and spiky.' },
    { id: 'cherimoya', english: 'cherimoya', chinese: '番荔枝', phonetic: '/ˌtʃer.ɪˈmoʊ.jə/', themeId: 'fruits', imageUrl: '/images/fruits/cherimoya.png', example: 'Cherimoya is sweet and creamy.' },
    { id: 'feijoa', english: 'feijoa', chinese: '费约果', phonetic: '/feɪˈdʒoʊ.ə/', themeId: 'fruits', imageUrl: '/images/fruits/feijoa.png', example: 'Feijoa is green and oval.' },
    { id: 'kiwano', english: 'kiwano', chinese: '角瓜', phonetic: '/kiˈwɑː.noʊ/', themeId: 'fruits', imageUrl: '/images/fruits/kiwano.png', example: 'Kiwano is orange and spiky.' },
    { id: 'pitaya', english: 'pitaya', chinese: '仙人掌果', phonetic: '/pɪˈtaɪ.ə/', themeId: 'fruits', imageUrl: '/images/fruits/pitaya.png', example: 'Pitaya grows on cactus.' },
    { id: 'salak', english: 'salak', chinese: '蛇皮果', phonetic: '/ˈsɑː.læk/', themeId: 'fruits', imageUrl: '/images/fruits/salak.png', example: 'Salak has snake-like skin.' },
    { id: 'santol', english: 'santol', chinese: '山陀儿', phonetic: '/ˈsæn.toʊl/', themeId: 'fruits', imageUrl: '/images/fruits/santol.png', example: 'Santol is yellow and round.' },
    { id: 'tamarillo', english: 'tamarillo', chinese: '树番茄', phonetic: '/ˌtæm.əˈrɪl.oʊ/', themeId: 'fruits', imageUrl: '/images/fruits/tamarillo.png', example: 'Tamarillo is like tomato but sweet.' },
    { id: 'wax apple', english: 'wax apple', chinese: '莲雾', phonetic: '/wæks ˈæp.əl/', themeId: 'fruits', imageUrl: '/images/fruits/wax-apple.png', example: 'Wax apple is red and shiny.' },
    { id: 'yuzu', english: 'yuzu', chinese: '柚子', phonetic: '/ˈjuː.zuː/', themeId: 'fruits', imageUrl: '/images/fruits/yuzu.png', example: 'Yuzu is Japanese citrus fruit.' },
    // 动物 (animals) - 最常用50个
    { id: 'dog', english: 'dog', chinese: '狗', phonetic: '/dɔːɡ/', themeId: 'animals', imageUrl: '/images/animals/dog.png', example: 'Dogs like to play.' },
    { id: 'cat', english: 'cat', chinese: '猫', phonetic: '/kæt/', themeId: 'animals', imageUrl: '/images/animals/cat.png', example: 'The cat is sleeping.' },
    { id: 'tiger', english: 'tiger', chinese: '老虎', phonetic: '/ˈtaɪ.ɡər/', themeId: 'animals', imageUrl: '/images/animals/tiger.png', example: 'The tiger is strong.' },
    { id: 'lion', english: 'lion', chinese: '狮子', phonetic: '/ˈlaɪ.ən/', themeId: 'animals', imageUrl: '/images/animals/lion.png', example: 'The lion is brave.' },
    { id: 'bear', english: 'bear', chinese: '熊', phonetic: '/ber/', themeId: 'animals', imageUrl: '/images/animals/bear.png', example: 'Bears are big.' },
    { id: 'rabbit', english: 'rabbit', chinese: '兔子', phonetic: '/ˈræb.ɪt/', themeId: 'animals', imageUrl: '/images/animals/rabbit.png', example: 'Rabbits hop fast.' },
    { id: 'mouse', english: 'mouse', chinese: '老鼠', phonetic: '/maʊs/', themeId: 'animals', imageUrl: '/images/animals/mouse.png', example: 'The mouse is small.' },
    { id: 'horse', english: 'horse', chinese: '马', phonetic: '/hɔːrs/', themeId: 'animals', imageUrl: '/images/animals/horse.png', example: 'Horses run fast.' },
    { id: 'cow', english: 'cow', chinese: '奶牛', phonetic: '/kaʊ/', themeId: 'animals', imageUrl: '/images/animals/cow.png', example: 'Cows give milk.' },
    { id: 'pig', english: 'pig', chinese: '猪', phonetic: '/pɪɡ/', themeId: 'animals', imageUrl: '/images/animals/pig.png', example: 'Pigs are pink.' },
    { id: 'sheep', english: 'sheep', chinese: '羊', phonetic: '/ʃiːp/', themeId: 'animals', imageUrl: '/images/animals/sheep.png', example: 'Sheep have wool.' },
    { id: 'goat', english: 'goat', chinese: '山羊', phonetic: '/ɡoʊt/', themeId: 'animals', imageUrl: '/images/animals/goat.png', example: 'Goats climb mountains.' },
    { id: 'chicken', english: 'chicken', chinese: '鸡', phonetic: '/ˈtʃɪk.ɪn/', themeId: 'animals', imageUrl: '/images/animals/chicken.png', example: 'Chickens lay eggs.' },
    { id: 'duck', english: 'duck', chinese: '鸭子', phonetic: '/dʌk/', themeId: 'animals', imageUrl: '/images/animals/duck.png', example: 'Ducks swim well.' },
    { id: 'bird', english: 'bird', chinese: '鸟', phonetic: '/bɜːrd/', themeId: 'animals', imageUrl: '/images/animals/bird.png', example: 'Birds can fly.' },
    { id: 'fish', english: 'fish', chinese: '鱼', phonetic: '/fɪʃ/', themeId: 'animals', imageUrl: '/images/animals/fish.png', example: 'Fish live in water.' },
    { id: 'frog', english: 'frog', chinese: '青蛙', phonetic: '/frɔːɡ/', themeId: 'animals', imageUrl: '/images/animals/frog.png', example: 'Frogs jump high.' },
    { id: 'snake', english: 'snake', chinese: '蛇', phonetic: '/sneɪk/', themeId: 'animals', imageUrl: '/images/animals/snake.png', example: 'Snakes are long.' },
    { id: 'turtle', english: 'turtle', chinese: '乌龟', phonetic: '/ˈtɜːr.təl/', themeId: 'animals', imageUrl: '/images/animals/turtle.png', example: 'Turtles are slow.' },
    { id: 'monkey', english: 'monkey', chinese: '猴子', phonetic: '/ˈmʌŋ.ki/', themeId: 'animals', imageUrl: '/images/animals/monkey.png', example: 'Monkeys swing on trees.' },
    { id: 'panda', english: 'panda', chinese: '熊猫', phonetic: '/ˈpæn.də/', themeId: 'animals', imageUrl: '/images/animals/panda.png', example: 'Pandas eat bamboo.' },
    { id: 'koala', english: 'koala', chinese: '考拉', phonetic: '/koʊˈɑː.lə/', themeId: 'animals', imageUrl: '/images/animals/koala.png', example: 'Koalas sleep a lot.' },
    { id: 'kangaroo', english: 'kangaroo', chinese: '袋鼠', phonetic: '/ˌkæŋ.ɡəˈruː/', themeId: 'animals', imageUrl: '/images/animals/kangaroo.png', example: 'Kangaroos hop.' },
    { id: 'giraffe', english: 'giraffe', chinese: '长颈鹿', phonetic: '/dʒəˈræf/', themeId: 'animals', imageUrl: '/images/animals/giraffe.png', example: 'Giraffes are tall.' },
    { id: 'zebra', english: 'zebra', chinese: '斑马', phonetic: '/ˈziː.brə/', themeId: 'animals', imageUrl: '/images/animals/zebra.png', example: 'Zebras have stripes.' },
    { id: 'hippo', english: 'hippo', chinese: '河马', phonetic: '/ˈhɪp.oʊ/', themeId: 'animals', imageUrl: '/images/animals/hippo.png', example: 'Hippos are big.' },
    { id: 'rhino', english: 'rhino', chinese: '犀牛', phonetic: '/ˈraɪ.noʊ/', themeId: 'animals', imageUrl: '/images/animals/rhino.png', example: 'Rhinos have horns.' },
    { id: 'wolf', english: 'wolf', chinese: '狼', phonetic: '/wʊlf/', themeId: 'animals', imageUrl: '/images/animals/wolf.png', example: 'Wolves howl at night.' },
    { id: 'fox', english: 'fox', chinese: '狐狸', phonetic: '/fɑːks/', themeId: 'animals', imageUrl: '/images/animals/fox.png', example: 'Foxes are clever.' },
    { id: 'deer', english: 'deer', chinese: '鹿', phonetic: '/dɪr/', themeId: 'animals', imageUrl: '/images/animals/deer.png', example: 'Deer run fast.' },
    { id: 'squirrel', english: 'squirrel', chinese: '松鼠', phonetic: '/ˈskwɜːr.əl/', themeId: 'animals', imageUrl: '/images/animals/squirrel.png', example: 'Squirrels collect nuts.' },
    { id: 'owl', english: 'owl', chinese: '猫头鹰', phonetic: '/aʊl/', themeId: 'animals', imageUrl: '/images/animals/owl.png', example: 'Owls hunt at night.' },
    { id: 'eagle', english: 'eagle', chinese: '鹰', phonetic: '/ˈiː.ɡəl/', themeId: 'animals', imageUrl: '/images/animals/eagle.png', example: 'Eagles fly high.' },
    { id: 'penguin', english: 'penguin', chinese: '企鹅', phonetic: '/ˈpeŋ.ɡwɪn/', themeId: 'animals', imageUrl: '/images/animals/penguin.png', example: 'Penguins swim well.' },
    { id: 'dolphin', english: 'dolphin', chinese: '海豚', phonetic: '/ˈdɑːl.fɪn/', themeId: 'animals', imageUrl: '/images/animals/dolphin.png', example: 'Dolphins are smart.' },
    { id: 'whale', english: 'whale', chinese: '鲸鱼', phonetic: '/weɪl/', themeId: 'animals', imageUrl: '/images/animals/whale.png', example: 'Whales are huge.' },
    { id: 'shark', english: 'shark', chinese: '鲨鱼', phonetic: '/ʃɑːrk/', themeId: 'animals', imageUrl: '/images/animals/shark.png', example: 'Sharks live in the ocean.' },
    { id: 'octopus', english: 'octopus', chinese: '章鱼', phonetic: '/ˈɑːk.tə.pʊs/', themeId: 'animals', imageUrl: '/images/animals/octopus.png', example: 'Octopus has eight arms.' },
    { id: 'crab', english: 'crab', chinese: '螃蟹', phonetic: '/kræb/', themeId: 'animals', imageUrl: '/images/animals/crab.png', example: 'Crabs walk sideways.' },
    { id: 'butterfly', english: 'butterfly', chinese: '蝴蝶', phonetic: '/ˈbʌt̬.ɚ.flaɪ/', themeId: 'animals', imageUrl: '/images/animals/butterfly.png', example: 'Butterfly has colorful wings.' },
    { id: 'bee', english: 'bee', chinese: '蜜蜂', phonetic: '/biː/', themeId: 'animals', imageUrl: '/images/animals/bee.png', example: 'Bees make honey.' },
    { id: 'ant', english: 'ant', chinese: '蚂蚁', phonetic: '/ænt/', themeId: 'animals', imageUrl: '/images/animals/ant.png', example: 'Ants work together.' },
    { id: 'spider', english: 'spider', chinese: '蜘蛛', phonetic: '/ˈspaɪ.dər/', themeId: 'animals', imageUrl: '/images/animals/spider.png', example: 'Spiders spin webs.' },
    { id: 'ladybug', english: 'ladybug', chinese: '瓢虫', phonetic: '/ˈleɪ.di.bʌɡ/', themeId: 'animals', imageUrl: '/images/animals/ladybug.png', example: 'Ladybugs are red with spots.' },
    { id: 'dragonfly', english: 'dragonfly', chinese: '蜻蜓', phonetic: '/ˈdræɡ.ən.flaɪ/', themeId: 'animals', imageUrl: '/images/animals/dragonfly.png', example: 'Dragonflies fly fast.' },
    { id: 'grasshopper', english: 'grasshopper', chinese: '蚱蜢', phonetic: '/ˈɡræs.hɑː.pər/', themeId: 'animals', imageUrl: '/images/animals/grasshopper.png', example: 'Grasshoppers jump high.' },
    { id: 'cricket', english: 'cricket', chinese: '蟋蟀', phonetic: '/ˈkrɪk.ɪt/', themeId: 'animals', imageUrl: '/images/animals/cricket.png', example: 'Crickets make noise at night.' },
    { id: 'mosquito', english: 'mosquito', chinese: '蚊子', phonetic: '/məˈskiː.toʊ/', themeId: 'animals', imageUrl: '/images/animals/mosquito.png', example: 'Mosquitoes bite people.' },
    { id: 'fly', english: 'fly', chinese: '苍蝇', phonetic: '/flaɪ/', themeId: 'animals', imageUrl: '/images/animals/fly.png', example: 'Flies buzz around food.' },
    { id: 'worm', english: 'worm', chinese: '虫子', phonetic: '/wɜːrm/', themeId: 'animals', imageUrl: '/images/animals/worm.png', example: 'Worms live in soil.' },
    { id: 'snail', english: 'snail', chinese: '蜗牛', phonetic: '/sneɪl/', themeId: 'animals', imageUrl: '/images/animals/snail.png', example: 'Snails carry their house.' },
    { id: 'lizard', english: 'lizard', chinese: '蜥蜴', phonetic: '/ˈlɪz.ərd/', themeId: 'animals', imageUrl: '/images/animals/lizard.png', example: 'Lizards can change color.' },
    { id: 'gecko', english: 'gecko', chinese: '壁虎', phonetic: '/ˈɡek.oʊ/', themeId: 'animals', imageUrl: '/images/animals/gecko.png', example: 'Geckos can climb walls.' },
    { id: 'chameleon', english: 'chameleon', chinese: '变色龙', phonetic: '/kəˈmiː.li.ən/', themeId: 'animals', imageUrl: '/images/animals/chameleon.png', example: 'Chameleons change colors.' },
    { id: 'iguana', english: 'iguana', chinese: '鬣蜥', phonetic: '/ɪˈɡwɑː.nə/', themeId: 'animals', imageUrl: '/images/animals/iguana.png', example: 'Iguanas are green lizards.' },
    { id: 'alligator', english: 'alligator', chinese: '短吻鳄', phonetic: '/ˈæl.ə.ɡeɪ.tər/', themeId: 'animals', imageUrl: '/images/animals/alligator.png', example: 'Alligators live in swamps.' },
    { id: 'crocodile', english: 'crocodile', chinese: '鳄鱼', phonetic: '/ˈkrɑː.kə.daɪl/', themeId: 'animals', imageUrl: '/images/animals/crocodile.png', example: 'Crocodiles have sharp teeth.' },
    { id: 'elephant', english: 'elephant', chinese: '大象', phonetic: '/ˈel.ə.fənt/', themeId: 'animals', imageUrl: '/images/animals/elephant.png', example: 'Elephants are very big.' },
    { id: 'camel', english: 'camel', chinese: '骆驼', phonetic: '/ˈkæm.əl/', themeId: 'animals', imageUrl: '/images/animals/camel.png', example: 'Camels live in deserts.' },
    { id: 'donkey', english: 'donkey', chinese: '驴', phonetic: '/ˈdɑːŋ.ki/', themeId: 'animals', imageUrl: '/images/animals/donkey.png', example: 'Donkeys carry heavy things.' },
    // ... (rest of the vocabulary data remains the same)
    // 颜色 (colors) - 最常用50个
    { id: 'red', english: 'red', chinese: '红色', phonetic: '/red/', themeId: 'colors', imageUrl: '/images/colors/red.png', example: 'The apple is red.' },
    { id: 'blue', english: 'blue', chinese: '蓝色', phonetic: '/bluː/', themeId: 'colors', imageUrl: '/images/colors/blue.png', example: 'The sky is blue.' },
    { id: 'green', english: 'green', chinese: '绿色', phonetic: '/ɡriːn/', themeId: 'colors', imageUrl: '/images/colors/green.png', example: 'The grass is green.' },
    { id: 'yellow', english: 'yellow', chinese: '黄色', phonetic: '/ˈjel.oʊ/', themeId: 'colors', imageUrl: '/images/colors/yellow.png', example: 'The sun is yellow.' },
    { id: 'orange', english: 'orange', chinese: '橙色', phonetic: '/ˈɔːr.ɪndʒ/', themeId: 'colors', imageUrl: '/images/colors/orange.png', example: 'The orange is orange.' },
    { id: 'purple', english: 'purple', chinese: '紫色', phonetic: '/ˈpɜːr.pəl/', themeId: 'colors', imageUrl: '/images/colors/purple.png', example: 'Grapes are purple.' },
    { id: 'pink', english: 'pink', chinese: '粉色', phonetic: '/pɪŋk/', themeId: 'colors', imageUrl: '/images/colors/pink.png', example: 'The flower is pink.' },
    { id: 'brown', english: 'brown', chinese: '棕色', phonetic: '/braʊn/', themeId: 'colors', imageUrl: '/images/colors/brown.png', example: 'The bear is brown.' },
    { id: 'black', english: 'black', chinese: '黑色', phonetic: '/blæk/', themeId: 'colors', imageUrl: '/images/colors/black.png', example: 'The cat is black.' },
    { id: 'white', english: 'white', chinese: '白色', phonetic: '/waɪt/', themeId: 'colors', imageUrl: '/images/colors/white.png', example: 'The snow is white.' },
    { id: 'gray', english: 'gray', chinese: '灰色', phonetic: '/ɡreɪ/', themeId: 'colors', imageUrl: '/images/colors/gray.png', example: 'The rock is gray.' },
    { id: 'silver', english: 'silver', chinese: '银色', phonetic: '/ˈsɪl.vər/', themeId: 'colors', imageUrl: '/images/colors/silver.png', example: 'The coin is silver.' },
    { id: 'gold', english: 'gold', chinese: '金色', phonetic: '/ɡoʊld/', themeId: 'colors', imageUrl: '/images/colors/gold.png', example: 'The ring is gold.' },
    { id: 'beige', english: 'beige', chinese: '米色', phonetic: '/beɪʒ/', themeId: 'colors', imageUrl: '/images/colors/beige.png', example: 'The sand is beige.' },
    { id: 'ivory', english: 'ivory', chinese: '象牙色', phonetic: '/ˈaɪ.vər.i/', themeId: 'colors', imageUrl: '/images/colors/ivory.png', example: 'The piano keys are ivory.' },
    { id: 'cream', english: 'cream', chinese: '奶油色', phonetic: '/kriːm/', themeId: 'colors', imageUrl: '/images/colors/cream.png', example: 'The wall is cream color.' },
    { id: 'maroon', english: 'maroon', chinese: '栗色', phonetic: '/məˈruːn/', themeId: 'colors', imageUrl: '/images/colors/maroon.png', example: 'The sweater is maroon.' },
    { id: 'navy', english: 'navy', chinese: '海军蓝', phonetic: '/ˈneɪ.vi/', themeId: 'colors', imageUrl: '/images/colors/navy.png', example: 'The uniform is navy blue.' },
    { id: 'teal', english: 'teal', chinese: '青色', phonetic: '/tiːl/', themeId: 'colors', imageUrl: '/images/colors/teal.png', example: 'The water is teal.' },
    { id: 'cyan', english: 'cyan', chinese: '蓝绿色', phonetic: '/ˈsaɪ.æn/', themeId: 'colors', imageUrl: '/images/colors/cyan.png', example: 'Cyan is a bright blue.' },
    { id: 'magenta', english: 'magenta', chinese: '品红色', phonetic: '/məˈdʒen.tə/', themeId: 'colors', imageUrl: '/images/colors/magenta.png', example: 'Magenta is a deep pink.' },
    { id: 'fuchsia', english: 'fuchsia', chinese: '紫红色', phonetic: '/ˈfjuː.ʃə/', themeId: 'colors', imageUrl: '/images/colors/fuchsia.png', example: 'Fuchsia is vivid pink.' },
    { id: 'rose', english: 'rose', chinese: '玫瑰色', phonetic: '/roʊz/', themeId: 'colors', imageUrl: '/images/colors/rose.png', example: 'Rose is soft pink.' },
    { id: 'blush', english: 'blush', chinese: '腮红色', phonetic: '/blʌʃ/', themeId: 'colors', imageUrl: '/images/colors/blush.png', example: 'Blush is light pink.' },
    { id: 'cherry', english: 'cherry', chinese: '樱桃色', phonetic: '/ˈtʃer.i/', themeId: 'colors', imageUrl: '/images/colors/cherry.png', example: 'Cherry is bright red.' },
    { id: 'rust', english: 'rust', chinese: '铁锈色', phonetic: '/rʌst/', themeId: 'colors', imageUrl: '/images/colors/rust.png', example: 'Rust is reddish-brown.' },
    { id: 'burgundy', english: 'burgundy', chinese: '酒红色', phonetic: '/ˈbɜːr.ɡən.di/', themeId: 'colors', imageUrl: '/images/colors/burgundy.png', example: 'Burgundy is dark red.' },
    { id: 'crimson', english: 'crimson', chinese: '深红色', phonetic: '/ˈkrɪm.zən/', themeId: 'colors', imageUrl: '/images/colors/crimson.png', example: 'Crimson is deep red.' },
    { id: 'scarlet', english: 'scarlet', chinese: '猩红色', phonetic: '/ˈskɑːr.lət/', themeId: 'colors', imageUrl: '/images/colors/scarlet.png', example: 'Scarlet is bright red.' },
    { id: 'turquoise', english: 'turquoise', chinese: '绿松石色', phonetic: '/ˈtɜːr.kɔɪz/', themeId: 'colors', imageUrl: '/images/colors/turquoise.png', example: 'Turquoise is blue-green.' },
    { id: 'aqua', english: 'aqua', chinese: '水蓝色', phonetic: '/ˈæk.wə/', themeId: 'colors', imageUrl: '/images/colors/aqua.png', example: 'Aqua is light blue.' },
    { id: 'indigo', english: 'indigo', chinese: '靛蓝色', phonetic: '/ˈɪn.dɪ.ɡoʊ/', themeId: 'colors', imageUrl: '/images/colors/indigo.png', example: 'Indigo is deep blue.' },
    { id: 'violet', english: 'violet', chinese: '紫罗兰色', phonetic: '/ˈvaɪ.ə.lət/', themeId: 'colors', imageUrl: '/images/colors/violet.png', example: 'Violet is purple-blue.' },
    { id: 'lavender', english: 'lavender', chinese: '薰衣草色', phonetic: '/ˈlæv.ən.dər/', themeId: 'colors', imageUrl: '/images/colors/lavender.png', example: 'Lavender is light purple.' },
    { id: 'lilac', english: 'lilac', chinese: '丁香色', phonetic: '/ˈlaɪ.læk/', themeId: 'colors', imageUrl: '/images/colors/lilac.png', example: 'Lilac is pale purple.' },
    { id: 'mauve', english: 'mauve', chinese: '淡紫色', phonetic: '/moʊv/', themeId: 'colors', imageUrl: '/images/colors/mauve.png', example: 'Mauve is light purple.' },
    { id: 'plum', english: 'plum', chinese: '李子色', phonetic: '/plʌm/', themeId: 'colors', imageUrl: '/images/colors/plum.png', example: 'Plum is dark purple.' },
    { id: 'emerald', english: 'emerald', chinese: '翡翠绿', phonetic: '/ˈem.ə.rəld/', themeId: 'colors', imageUrl: '/images/colors/emerald.png', example: 'Emerald is bright green.' },
    { id: 'lime', english: 'lime', chinese: '酸橙绿', phonetic: '/laɪm/', themeId: 'colors', imageUrl: '/images/colors/lime.png', example: 'Lime is bright yellow-green.' },
    { id: 'olive', english: 'olive', chinese: '橄榄绿', phonetic: '/ˈɑː.lɪv/', themeId: 'colors', imageUrl: '/images/colors/olive.png', example: 'Olive is dark green.' },
    { id: 'mint', english: 'mint', chinese: '薄荷绿', phonetic: '/mɪnt/', themeId: 'colors', imageUrl: '/images/colors/mint.png', example: 'Mint is light green.' },
    { id: 'forest', english: 'forest', chinese: '森林绿', phonetic: '/ˈfɔːr.ɪst/', themeId: 'colors', imageUrl: '/images/colors/forest.png', example: 'Forest is dark green.' },
    { id: 'sage', english: 'sage', chinese: '鼠尾草绿', phonetic: '/seɪdʒ/', themeId: 'colors', imageUrl: '/images/colors/sage.png', example: 'Sage is gray-green.' },
    { id: 'khaki', english: 'khaki', chinese: '卡其色', phonetic: '/ˈkɑː.ki/', themeId: 'colors', imageUrl: '/images/colors/khaki.png', example: 'Khaki is brownish-green.' },
    { id: 'tan', english: 'tan', chinese: '棕褐色', phonetic: '/tæn/', themeId: 'colors', imageUrl: '/images/colors/tan.png', example: 'Tan is light brown.' },
    { id: 'copper', english: 'copper', chinese: '铜色', phonetic: '/ˈkɑː.pər/', themeId: 'colors', imageUrl: '/images/colors/copper.png', example: 'Copper is reddish-brown.' },
    { id: 'bronze', english: 'bronze', chinese: '青铜色', phonetic: '/brɑːnz/', themeId: 'colors', imageUrl: '/images/colors/bronze.png', example: 'Bronze is brownish-gold.' },
    { id: 'peach', english: 'peach', chinese: '桃色', phonetic: '/piːtʃ/', themeId: 'colors', imageUrl: '/images/colors/peach.png', example: 'Peach is orange-pink.' },
    { id: 'coral', english: 'coral', chinese: '珊瑚色', phonetic: '/ˈkɔːr.əl/', themeId: 'colors', imageUrl: '/images/colors/coral.png', example: 'Coral is pink-orange.' },
    { id: 'salmon', english: 'salmon', chinese: '鲑鱼色', phonetic: '/ˈsæm.ən/', themeId: 'colors', imageUrl: '/images/colors/salmon.png', example: 'Salmon is pink-orange.' },
    { id: 'apricot', english: 'apricot', chinese: '杏色', phonetic: '/ˈeɪ.prɪ.kɑːt/', themeId: 'colors', imageUrl: '/images/colors/apricot.png', example: 'Apricot is orange-yellow.' },
    { id: 'amber', english: 'amber', chinese: '琥珀色', phonetic: '/ˈæm.bər/', themeId: 'colors', imageUrl: '/images/colors/amber.png', example: 'Amber is yellow-orange.' },
    { id: 'mustard', english: 'mustard', chinese: '芥末色', phonetic: '/ˈmʌs.tərd/', themeId: 'colors', imageUrl: '/images/colors/mustard.png', example: 'Mustard is dark yellow.' },
    { id: 'lemon', english: 'lemon', chinese: '柠檬色', phonetic: '/ˈlem.ən/', themeId: 'colors', imageUrl: '/images/colors/lemon.png', example: 'Lemon is bright yellow.' },
    { id: 'canary', english: 'canary', chinese: '金丝雀色', phonetic: '/kəˈner.i/', themeId: 'colors', imageUrl: '/images/colors/canary.png', example: 'Canary is bright yellow.' },
    { id: 'chartreuse', english: 'chartreuse', chinese: '黄绿色', phonetic: '/ʃɑːrˈtruːz/', themeId: 'colors', imageUrl: '/images/colors/chartreuse.png', example: 'Chartreuse is yellow-green.' },
    { id: 'jade', english: 'jade', chinese: '翡翠色', phonetic: '/dʒeɪd/', themeId: 'colors', imageUrl: '/images/colors/jade.png', example: 'Jade is green stone color.' },
    { id: 'moss', english: 'moss', chinese: '苔藓绿', phonetic: '/mɔːs/', themeId: 'colors', imageUrl: '/images/colors/moss.png', example: 'Moss is dark green.' },
    { id: 'seafoam', english: 'seafoam', chinese: '海泡绿', phonetic: '/ˈsiː.foʊm/', themeId: 'colors', imageUrl: '/images/colors/seafoam.png', example: 'Seafoam is light blue-green.' },
    { id: 'peacock', english: 'peacock', chinese: '孔雀蓝', phonetic: '/ˈpiː.kɑːk/', themeId: 'colors', imageUrl: '/images/colors/peacock.png', example: 'Peacock is blue-green.' },
    { id: 'royal', english: 'royal', chinese: '皇家蓝', phonetic: '/ˈrɔɪ.əl/', themeId: 'colors', imageUrl: '/images/colors/royal.png', example: 'Royal is deep blue.' },
    { id: 'midnight', english: 'midnight', chinese: '午夜蓝', phonetic: '/ˈmɪd.naɪt/', themeId: 'colors', imageUrl: '/images/colors/midnight.png', example: 'Midnight is very dark blue.' },
    { id: 'slate', english: 'slate', chinese: '石板灰', phonetic: '/sleɪt/', themeId: 'colors', imageUrl: '/images/colors/slate.png', example: 'Slate is dark gray.' },
    { id: 'charcoal', english: 'charcoal', chinese: '炭灰色', phonetic: '/ˈtʃɑːr.koʊl/', themeId: 'colors', imageUrl: '/images/colors/charcoal.png', example: 'Charcoal is dark gray.' },
    { id: 'pearl', english: 'pearl', chinese: '珍珠色', phonetic: '/pɜːrl/', themeId: 'colors', imageUrl: '/images/colors/pearl.png', example: 'Pearl is white with shine.' },
    { id: 'platinum', english: 'platinum', chinese: '铂金色', phonetic: '/ˈplæt.ɪ.nəm/', themeId: 'colors', imageUrl: '/images/colors/platinum.png', example: 'Platinum is silver-white.' },
    // 数字 (numbers)
    { id: 'zero', english: 'zero', chinese: '零', phonetic: '/ˈzɪr.oʊ/', themeId: 'numbers', imageUrl: '/images/numbers/zero.png', example: 'Zero means nothing.' },
    { id: 'one', english: 'one', chinese: '一', phonetic: '/wʌn/', themeId: 'numbers', imageUrl: '/images/numbers/one.png', example: 'I have one apple.' },
    { id: 'two', english: 'two', chinese: '二', phonetic: '/tuː/', themeId: 'numbers', imageUrl: '/images/numbers/two.png', example: 'I see two cats.' },
    { id: 'three', english: 'three', chinese: '三', phonetic: '/θriː/', themeId: 'numbers', imageUrl: '/images/numbers/three.png', example: 'There are three birds.' },
    { id: 'four', english: 'four', chinese: '四', phonetic: '/fɔːr/', themeId: 'numbers', imageUrl: '/images/numbers/four.png', example: 'I have four books.' },
    { id: 'five', english: 'five', chinese: '五', phonetic: '/faɪv/', themeId: 'numbers', imageUrl: '/images/numbers/five.png', example: 'Five fingers on my hand.' },
    { id: 'six', english: 'six', chinese: '六', phonetic: '/sɪks/', themeId: 'numbers', imageUrl: '/images/numbers/six.png', example: 'Six legs on an insect.' },
    { id: 'seven', english: 'seven', chinese: '七', phonetic: '/ˈsev.ən/', themeId: 'numbers', imageUrl: '/images/numbers/seven.png', example: 'Seven days in a week.' },
    { id: 'eight', english: 'eight', chinese: '八', phonetic: '/eɪt/', themeId: 'numbers', imageUrl: '/images/numbers/eight.png', example: 'Eight legs on a spider.' },
    { id: 'nine', english: 'nine', chinese: '九', phonetic: '/naɪn/', themeId: 'numbers', imageUrl: '/images/numbers/nine.png', example: 'Nine planets in our system.' },
    { id: 'ten', english: 'ten', chinese: '十', phonetic: '/ten/', themeId: 'numbers', imageUrl: '/images/numbers/ten.png', example: 'Ten toes on my feet.' },
    { id: 'eleven', english: 'eleven', chinese: '十一', phonetic: '/ɪˈlev.ən/', themeId: 'numbers', imageUrl: '/images/numbers/eleven.png', example: 'Eleven players on a team.' },
    { id: 'twelve', english: 'twelve', chinese: '十二', phonetic: '/twelv/', themeId: 'numbers', imageUrl: '/images/numbers/twelve.png', example: 'Twelve months in a year.' },
    { id: 'thirteen', english: 'thirteen', chinese: '十三', phonetic: '/ˌθɜːrˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/thirteen.png', example: 'Thirteen is a teen number.' },
    { id: 'fourteen', english: 'fourteen', chinese: '十四', phonetic: '/ˌfɔːrˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/fourteen.png', example: 'Fourteen days in two weeks.' },
    { id: 'fifteen', english: 'fifteen', chinese: '十五', phonetic: '/ˌfɪfˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/fifteen.png', example: 'Fifteen minutes is a quarter hour.' },
    { id: 'sixteen', english: 'sixteen', chinese: '十六', phonetic: '/ˌsɪksˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/sixteen.png', example: 'Sixteen candles on the cake.' },
    { id: 'seventeen', english: 'seventeen', chinese: '十七', phonetic: '/ˌsev.ənˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/seventeen.png', example: 'Seventeen years old.' },
    { id: 'eighteen', english: 'eighteen', chinese: '十八', phonetic: '/ˌeɪˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/eighteen.png', example: 'Eighteen is adult age.' },
    { id: 'nineteen', english: 'nineteen', chinese: '十九', phonetic: '/ˌnaɪnˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/nineteen.png', example: 'Nineteen is almost twenty.' },
    { id: 'twenty', english: 'twenty', chinese: '二十', phonetic: '/ˈtwen.ti/', themeId: 'numbers', imageUrl: '/images/numbers/twenty.png', example: 'Twenty fingers and toes.' },
    { id: 'thirty', english: 'thirty', chinese: '三十', phonetic: '/ˈθɜːr.ti/', themeId: 'numbers', imageUrl: '/images/numbers/thirty.png', example: 'Thirty days in some months.' },
    { id: 'forty', english: 'forty', chinese: '四十', phonetic: '/ˈfɔːr.ti/', themeId: 'numbers', imageUrl: '/images/numbers/forty.png', example: 'Forty hours of work.' },
    { id: 'fifty', english: 'fifty', chinese: '五十', phonetic: '/ˈfɪf.ti/', themeId: 'numbers', imageUrl: '/images/numbers/fifty.png', example: 'Fifty states in America.' },
    { id: 'sixty', english: 'sixty', chinese: '六十', phonetic: '/ˈsɪks.ti/', themeId: 'numbers', imageUrl: '/images/numbers/sixty.png', example: 'Sixty seconds in a minute.' },
    { id: 'seventy', english: 'seventy', chinese: '七十', phonetic: '/ˈsev.ən.ti/', themeId: 'numbers', imageUrl: '/images/numbers/seventy.png', example: 'Seventy years is old age.' },
    { id: 'eighty', english: 'eighty', chinese: '八十', phonetic: '/ˈeɪ.ti/', themeId: 'numbers', imageUrl: '/images/numbers/eighty.png', example: 'Eighty degrees is hot.' },
    { id: 'ninety', english: 'ninety', chinese: '九十', phonetic: '/ˈnaɪn.ti/', themeId: 'numbers', imageUrl: '/images/numbers/ninety.png', example: 'Ninety percent is almost all.' },
    { id: 'hundred', english: 'hundred', chinese: '一百', phonetic: '/ˈhʌn.drəd/', themeId: 'numbers', imageUrl: '/images/numbers/hundred.png', example: 'One hundred cents in a dollar.' },
    { id: 'thousand', english: 'thousand', chinese: '一千', phonetic: '/ˈθaʊ.zənd/', themeId: 'numbers', imageUrl: '/images/numbers/thousand.png', example: 'A thousand years is a millennium.' },
    { id: 'million', english: 'million', chinese: '一百万', phonetic: '/ˈmɪl.jən/', themeId: 'numbers', imageUrl: '/images/numbers/million.png', example: 'A million dollars is a lot.' },
    // 家庭 (family)
    { id: 'father', english: 'father', chinese: '父亲', phonetic: '/ˈfɑː.ðər/', themeId: 'family', imageUrl: '/images/family/father.png', example: 'My father is tall.' },
    { id: 'mother', english: 'mother', chinese: '母亲', phonetic: '/ˈmʌð.ər/', themeId: 'family', imageUrl: '/images/family/mother.png', example: 'My mother is kind.' },
    { id: 'son', english: 'son', chinese: '儿子', phonetic: '/sʌn/', themeId: 'family', imageUrl: '/images/family/son.png', example: 'He is their son.' },
    { id: 'daughter', english: 'daughter', chinese: '女儿', phonetic: '/ˈdɔː.tər/', themeId: 'family', imageUrl: '/images/family/daughter.png', example: 'She is their daughter.' },
    { id: 'brother', english: 'brother', chinese: '兄弟', phonetic: '/ˈbrʌð.ər/', themeId: 'family', imageUrl: '/images/family/brother.png', example: 'My brother is older.' },
    { id: 'sister', english: 'sister', chinese: '姐妹', phonetic: '/ˈsɪs.tər/', themeId: 'family', imageUrl: '/images/family/sister.png', example: 'My sister is younger.' },
    { id: 'grandfather', english: 'grandfather', chinese: '祖父', phonetic: '/ˈɡrænd.fɑː.ðər/', themeId: 'family', imageUrl: '/images/family/grandfather.png', example: 'My grandfather has glasses.' },
    { id: 'grandmother', english: 'grandmother', chinese: '祖母', phonetic: '/ˈɡrænd.mʌð.ər/', themeId: 'family', imageUrl: '/images/family/grandmother.png', example: 'My grandmother bakes cookies.' },
    { id: 'grandson', english: 'grandson', chinese: '孙子', phonetic: '/ˈɡrænd.sʌn/', themeId: 'family', imageUrl: '/images/family/grandson.png', example: 'He is her grandson.' },
    { id: 'granddaughter', english: 'granddaughter', chinese: '孙女', phonetic: '/ˈɡrænd.dɔː.tər/', themeId: 'family', imageUrl: '/images/family/granddaughter.png', example: 'She is his granddaughter.' },
    { id: 'uncle', english: 'uncle', chinese: '叔叔', phonetic: '/ˈʌŋ.kəl/', themeId: 'family', imageUrl: '/images/family/uncle.png', example: 'My uncle tells funny jokes.' },
    { id: 'aunt', english: 'aunt', chinese: '阿姨', phonetic: '/ænt/', themeId: 'family', imageUrl: '/images/family/aunt.png', example: 'My aunt gives me gifts.' },
    { id: 'cousin', english: 'cousin', chinese: '堂/表兄弟姐妹', phonetic: '/ˈkʌz.ən/', themeId: 'family', imageUrl: '/images/family/cousin.png', example: 'I play with my cousin.' },
    { id: 'nephew', english: 'nephew', chinese: '侄子', phonetic: '/ˈnef.juː/', themeId: 'family', imageUrl: '/images/family/nephew.png', example: 'My nephew is small.' },
    { id: 'niece', english: 'niece', chinese: '侄女', phonetic: '/niːs/', themeId: 'family', imageUrl: '/images/family/niece.png', example: 'My niece is cute.' },
    { id: 'husband', english: 'husband', chinese: '丈夫', phonetic: '/ˈhʌz.bənd/', themeId: 'family', imageUrl: '/images/family/husband.png', example: 'He is her husband.' },
    { id: 'wife', english: 'wife', chinese: '妻子', phonetic: '/waɪf/', themeId: 'family', imageUrl: '/images/family/wife.png', example: 'She is his wife.' },
    { id: 'parent', english: 'parent', chinese: '父母', phonetic: '/ˈper.ənt/', themeId: 'family', imageUrl: '/images/family/parent.png', example: 'My parents love me.' },
    { id: 'child', english: 'child', chinese: '孩子', phonetic: '/tʃaɪld/', themeId: 'family', imageUrl: '/images/family/child.png', example: 'The child is playing.' },
    { id: 'baby', english: 'baby', chinese: '婴儿', phonetic: '/ˈbeɪ.bi/', themeId: 'family', imageUrl: '/images/family/baby.png', example: 'The baby is crying.' },
    { id: 'toddler', english: 'toddler', chinese: '幼儿', phonetic: '/ˈtɑːd.lər/', themeId: 'family', imageUrl: '/images/family/toddler.png', example: 'The toddler is learning to walk.' },
    { id: 'teenager', english: 'teenager', chinese: '青少年', phonetic: '/ˈtiːn.eɪ.dʒər/', themeId: 'family', imageUrl: '/images/family/teenager.png', example: 'A teenager goes to high school.' },
    { id: 'adult', english: 'adult', chinese: '成年人', phonetic: '/əˈdʌlt/', themeId: 'family', imageUrl: '/images/family/adult.png', example: 'An adult has a job.' },
    { id: 'friend', english: 'friend', chinese: '朋友', phonetic: '/frend/', themeId: 'family', imageUrl: '/images/family/friend.png', example: 'He is my best friend.' },
    { id: 'neighbor', english: 'neighbor', chinese: '邻居', phonetic: '/ˈneɪ.bər/', themeId: 'family', imageUrl: '/images/family/neighbor.png', example: 'My neighbor is friendly.' },
    { id: 'family', english: 'family', chinese: '家庭', phonetic: '/ˈfæm.əl.i/', themeId: 'family', imageUrl: '/images/family/family.png', example: 'Family is important.' },
    { id: 'relative', english: 'relative', chinese: '亲戚', phonetic: '/ˈrel.ə.tɪv/', themeId: 'family', imageUrl: '/images/family/relative.png', example: 'Relatives visit on holidays.' },
    // 身体 (body)
    { id: 'head', english: 'head', chinese: '头', phonetic: '/hed/', themeId: 'body', imageUrl: '/images/body/head.png', example: 'My head is round.' },
    { id: 'face', english: 'face', chinese: '脸', phonetic: '/feɪs/', themeId: 'body', imageUrl: '/images/body/face.png', example: 'I wash my face.' },
    { id: 'eye', english: 'eye', chinese: '眼睛', phonetic: '/aɪ/', themeId: 'body', imageUrl: '/images/body/eye.png', example: 'I see with my eyes.' },
    { id: 'nose', english: 'nose', chinese: '鼻子', phonetic: '/noʊz/', themeId: 'body', imageUrl: '/images/body/nose.png', example: 'I smell with my nose.' },
    { id: 'mouth', english: 'mouth', chinese: '嘴巴', phonetic: '/maʊθ/', themeId: 'body', imageUrl: '/images/body/mouth.png', example: 'I eat with my mouth.' },
    { id: 'ear', english: 'ear', chinese: '耳朵', phonetic: '/ɪr/', themeId: 'body', imageUrl: '/images/body/ear.png', example: 'I hear with my ears.' },
    { id: 'hair', english: 'hair', chinese: '头发', phonetic: '/her/', themeId: 'body', imageUrl: '/images/body/hair.png', example: 'My hair is long.' },
    { id: 'neck', english: 'neck', chinese: '脖子', phonetic: '/nek/', themeId: 'body', imageUrl: '/images/body/neck.png', example: 'A giraffe has a long neck.' },
    { id: 'shoulder', english: 'shoulder', chinese: '肩膀', phonetic: '/ˈʃoʊl.dər/', themeId: 'body', imageUrl: '/images/body/shoulder.png', example: 'I carry a bag on my shoulder.' },
    { id: 'arm', english: 'arm', chinese: '手臂', phonetic: '/ɑːrm/', themeId: 'body', imageUrl: '/images/body/arm.png', example: 'My arms are strong.' },
    { id: 'hand', english: 'hand', chinese: '手', phonetic: '/hænd/', themeId: 'body', imageUrl: '/images/body/hand.png', example: 'I wave my hand.' },
    { id: 'finger', english: 'finger', chinese: '手指', phonetic: '/ˈfɪŋ.ɡər/', themeId: 'body', imageUrl: '/images/body/finger.png', example: 'I have five fingers on my hand.' },
    { id: 'thumb', english: 'thumb', chinese: '拇指', phonetic: '/θʌm/', themeId: 'body', imageUrl: '/images/body/thumb.png', example: 'The thumb is the biggest finger.' },
    { id: 'chest', english: 'chest', chinese: '胸部', phonetic: '/tʃest/', themeId: 'body', imageUrl: '/images/body/chest.png', example: 'My heart is in my chest.' },
    { id: 'back', english: 'back', chinese: '背部', phonetic: '/bæk/', themeId: 'body', imageUrl: '/images/body/back.png', example: 'I sleep on my back.' },
    { id: 'stomach', english: 'stomach', chinese: '肚子', phonetic: '/ˈstʌm.ək/', themeId: 'body', imageUrl: '/images/body/stomach.png', example: 'Food goes to the stomach.' },
    { id: 'leg', english: 'leg', chinese: '腿', phonetic: '/leɡ/', themeId: 'body', imageUrl: '/images/body/leg.png', example: 'I walk with my legs.' },
    { id: 'knee', english: 'knee', chinese: '膝盖', phonetic: '/niː/', themeId: 'body', imageUrl: '/images/body/knee.png', example: 'My knee bends when I walk.' },
    { id: 'foot', english: 'foot', chinese: '脚', phonetic: '/fʊt/', themeId: 'body', imageUrl: '/images/body/foot.png', example: 'I stand on my feet.' },
    { id: 'toe', english: 'toe', chinese: '脚趾', phonetic: '/toʊ/', themeId: 'body', imageUrl: '/images/body/toe.png', example: 'I have ten toes on my feet.' },
    { id: 'elbow', english: 'elbow', chinese: '肘部', phonetic: '/ˈel.boʊ/', themeId: 'body', imageUrl: '/images/body/elbow.png', example: 'My elbow bends my arm.' },
    { id: 'wrist', english: 'wrist', chinese: '手腕', phonetic: '/rɪst/', themeId: 'body', imageUrl: '/images/body/wrist.png', example: 'A watch goes on the wrist.' },
    { id: 'ankle', english: 'ankle', chinese: '脚踝', phonetic: '/ˈæŋ.kəl/', themeId: 'body', imageUrl: '/images/body/ankle.png', example: 'The ankle connects the foot to the leg.' },
    { id: 'heel', english: 'heel', chinese: '脚跟', phonetic: '/hiːl/', themeId: 'body', imageUrl: '/images/body/heel.png', example: 'The heel is the back of the foot.' },
    { id: 'palm', english: 'palm', chinese: '手掌', phonetic: '/pɑːm/', themeId: 'body', imageUrl: '/images/body/palm.png', example: 'The palm is the inside of the hand.' },
    { id: 'forehead', english: 'forehead', chinese: '额头', phonetic: '/ˈfɔːr.hed/', themeId: 'body', imageUrl: '/images/body/forehead.png', example: 'My forehead is above my eyes.' },
    { id: 'cheek', english: 'cheek', chinese: '脸颊', phonetic: '/tʃiːk/', themeId: 'body', imageUrl: '/images/body/cheek.png', example: 'My cheeks turn red when I am shy.' },
    { id: 'chin', english: 'chin', chinese: '下巴', phonetic: '/tʃɪn/', themeId: 'body', imageUrl: '/images/body/chin.png', example: 'My chin is below my mouth.' },
    { id: 'lip', english: 'lip', chinese: '嘴唇', phonetic: '/lɪp/', themeId: 'body', imageUrl: '/images/body/lip.png', example: 'My lips are around my mouth.' },
    { id: 'tooth', english: 'tooth', chinese: '牙齿', phonetic: '/tuːθ/', themeId: 'body', imageUrl: '/images/body/tooth.png', example: 'You should brush your teeth daily.' },
    { id: 'tongue', english: 'tongue', chinese: '舌头', phonetic: '/tʌŋ/', themeId: 'body', imageUrl: '/images/body/tongue.png', example: 'My tongue tastes food.' },
    { id: 'eyebrow', english: 'eyebrow', chinese: '眉毛', phonetic: '/ˈaɪ.braʊ/', themeId: 'body', imageUrl: '/images/body/eyebrow.png', example: 'Eyebrows protect the eyes.' },
    { id: 'eyelash', english: 'eyelash', chinese: '睫毛', phonetic: '/ˈaɪ.læʃ/', themeId: 'body', imageUrl: '/images/body/eyelash.png', example: 'Eyelashes are pretty.' },
    { id: 'beard', english: 'beard', chinese: '胡须', phonetic: '/bɪrd/', themeId: 'body', imageUrl: '/images/body/beard.png', example: 'My dad has a beard.' },
    { id: 'mustache', english: 'mustache', chinese: '胡子', phonetic: '/ˈmʌs.tæʃ/', themeId: 'body', imageUrl: '/images/body/mustache.png', example: 'A mustache is above the lip.' },
    { id: 'waist', english: 'waist', chinese: '腰部', phonetic: '/weɪst/', themeId: 'body', imageUrl: '/images/body/waist.png', example: 'A belt goes around the waist.' },
    { id: 'hip', english: 'hip', chinese: '臀部', phonetic: '/hɪp/', themeId: 'body', imageUrl: '/images/body/hip.png', example: 'Hips help us dance.' },
    { id: 'thigh', english: 'thigh', chinese: '大腿', phonetic: '/θaɪ/', themeId: 'body', imageUrl: '/images/body/thigh.png', example: 'The thigh is the upper leg.' },
    { id: 'calf', english: 'calf', chinese: '小腿', phonetic: '/kæf/', themeId: 'body', imageUrl: '/images/body/calf.png', example: 'The calf is the lower leg.' },
    { id: 'shin', english: 'shin', chinese: '胫骨', phonetic: '/ʃɪn/', themeId: 'body', imageUrl: '/images/body/shin.png', example: 'The shin is the front of the leg.' },
    { id: 'muscle', english: 'muscle', chinese: '肌肉', phonetic: '/ˈmʌs.əl/', themeId: 'body', imageUrl: '/images/body/muscle.png', example: 'Muscles make us strong.' },
    { id: 'bone', english: 'bone', chinese: '骨头', phonetic: '/boʊn/', themeId: 'body', imageUrl: '/images/body/bone.png', example: 'Bones support our body.' },
    { id: 'skin', english: 'skin', chinese: '皮肤', phonetic: '/skɪn/', themeId: 'body', imageUrl: '/images/body/skin.png', example: 'Skin covers our body.' },
    { id: 'blood', english: 'blood', chinese: '血液', phonetic: '/blʌd/', themeId: 'body', imageUrl: '/images/body/blood.png', example: 'Blood flows in our veins.' },
    { id: 'heart', english: 'heart', chinese: '心脏', phonetic: '/hɑːrt/', themeId: 'body', imageUrl: '/images/body/heart.png', example: 'My heart pumps blood.' },
    { id: 'brain', english: 'brain', chinese: '大脑', phonetic: '/breɪn/', themeId: 'body', imageUrl: '/images/body/brain.png', example: 'My brain helps me think.' },
    { id: 'lung', english: 'lung', chinese: '肺', phonetic: '/lʌŋ/', themeId: 'body', imageUrl: '/images/body/lung.png', example: 'Lungs help us breathe.' },
    { id: 'liver', english: 'liver', chinese: '肝脏', phonetic: '/ˈlɪv.ər/', themeId: 'body', imageUrl: '/images/body/liver.png', example: 'The liver cleans our blood.' },
    { id: 'kidney', english: 'kidney', chinese: '肾脏', phonetic: '/ˈkɪd.ni/', themeId: 'body', imageUrl: '/images/body/kidney.png', example: 'Kidneys filter waste.' },
    { id: 'spine', english: 'spine', chinese: '脊柱', phonetic: '/spaɪn/', themeId: 'body', imageUrl: '/images/body/spine.png', example: 'The spine supports the back.' },
    { id: 'rib', english: 'rib', chinese: '肋骨', phonetic: '/rɪb/', themeId: 'body', imageUrl: '/images/body/rib.png', example: 'Ribs protect our organs.' },
    // 食物 (food)
    { id: 'bread', english: 'bread', chinese: '面包', phonetic: '/bred/', themeId: 'food', imageUrl: '/images/food/bread.png', example: 'I eat bread for breakfast.' },
    { id: 'rice', english: 'rice', chinese: '米饭', phonetic: '/raɪs/', themeId: 'food', imageUrl: '/images/food/rice.png', example: 'Rice is white and fluffy.' },
    { id: 'noodle', english: 'noodle', chinese: '面条', phonetic: '/ˈnuː.dəl/', themeId: 'food', imageUrl: '/images/food/noodle.png', example: 'Noodles are long and thin.' },
    { id: 'pizza', english: 'pizza', chinese: '披萨', phonetic: '/ˈpiːt.sə/', themeId: 'food', imageUrl: '/images/food/pizza.png', example: 'Pizza has cheese and tomato.' },
    { id: 'hamburger', english: 'hamburger', chinese: '汉堡包', phonetic: '/ˈhæm.bɜːr.ɡər/', themeId: 'food', imageUrl: '/images/food/hamburger.png', example: 'A hamburger is delicious.' },
    { id: 'sandwich', english: 'sandwich', chinese: '三明治', phonetic: '/ˈsænd.wɪtʃ/', themeId: 'food', imageUrl: '/images/food/sandwich.png', example: 'A sandwich has meat and vegetables.' },
    { id: 'salad', english: 'salad', chinese: '沙拉', phonetic: '/ˈsæl.əd/', themeId: 'food', imageUrl: '/images/food/salad.png', example: 'Salad is healthy and fresh.' },
    { id: 'soup', english: 'soup', chinese: '汤', phonetic: '/suːp/', themeId: 'food', imageUrl: '/images/food/soup.png', example: 'Soup is warm and tasty.' },
    { id: 'egg', english: 'egg', chinese: '鸡蛋', phonetic: '/eɡ/', themeId: 'food', imageUrl: '/images/food/egg.png', example: 'I like to eat eggs.' },
    { id: 'cheese', english: 'cheese', chinese: '奶酪', phonetic: '/tʃiːz/', themeId: 'food', imageUrl: '/images/food/cheese.png', example: 'Mice like to eat cheese.' },
    { id: 'meat', english: 'meat', chinese: '肉', phonetic: '/miːt/', themeId: 'food', imageUrl: '/images/food/meat.png', example: 'Lions eat meat.' },
    { id: 'chicken', english: 'chicken', chinese: '鸡肉', phonetic: '/ˈtʃɪk.ɪn/', themeId: 'food', imageUrl: '/images/food/chicken.png', example: 'I like fried chicken.' },
    { id: 'beef', english: 'beef', chinese: '牛肉', phonetic: '/biːf/', themeId: 'food', imageUrl: '/images/food/beef.png', example: 'Beef comes from cows.' },
    { id: 'pork', english: 'pork', chinese: '猪肉', phonetic: '/pɔːrk/', themeId: 'food', imageUrl: '/images/food/pork.png', example: 'Pork comes from pigs.' },
    { id: 'fish', english: 'fish', chinese: '鱼肉', phonetic: '/fɪʃ/', themeId: 'food', imageUrl: '/images/food/fish.png', example: 'Fish is good for you.' },
    { id: 'vegetable', english: 'vegetable', chinese: '蔬菜', phonetic: '/ˈvedʒ.tə.bəl/', themeId: 'food', imageUrl: '/images/food/vegetable.png', example: 'Eat your vegetables.' },
    { id: 'fruit', english: 'fruit', chinese: '水果', phonetic: '/fruːt/', themeId: 'food', imageUrl: '/images/food/fruit.png', example: 'Fruit is sweet.' },
    { id: 'cake', english: 'cake', chinese: '蛋糕', phonetic: '/keɪk/', themeId: 'food', imageUrl: '/images/food/cake.png', example: 'I want a birthday cake.' },
    { id: 'cookie', english: 'cookie', chinese: '饼干', phonetic: '/ˈkʊk.i/', themeId: 'food', imageUrl: '/images/food/cookie.png', example: 'I love chocolate cookies.' },
    { id: 'ice cream', english: 'ice cream', chinese: '冰淇淋', phonetic: '/aɪs kriːm/', themeId: 'food', imageUrl: '/images/food/ice-cream.png', example: 'Ice cream is cold.' },
    { id: 'chocolate', english: 'chocolate', chinese: '巧克力', phonetic: '/ˈtʃɔːk.lət/', themeId: 'food', imageUrl: '/images/food/chocolate.png', example: 'Chocolate is sweet.' },
    { id: 'candy', english: 'candy', chinese: '糖果', phonetic: '/ˈkæn.di/', themeId: 'food', imageUrl: '/images/food/candy.png', example: 'Too much candy is bad.' },
    { id: 'juice', english: 'juice', chinese: '果汁', phonetic: '/dʒuːs/', themeId: 'food', imageUrl: '/images/food/juice.png', example: 'I drink orange juice.' },
    { id: 'water', english: 'water', chinese: '水', phonetic: '/ˈwɔː.tər/', themeId: 'food', imageUrl: '/images/food/water.png', example: 'Drink a lot of water.' },
    { id: 'milk', english: 'milk', chinese: '牛奶', phonetic: '/mɪlk/', themeId: 'food', imageUrl: '/images/food/milk.png', example: 'Milk makes bones strong.' },
    { id: 'donut', english: 'donut', chinese: '甜甜圈', phonetic: '/ˈdoʊ.nʌt/', themeId: 'food', imageUrl: '/images/food/donut.png', example: 'Donuts are round and sweet.' },
    { id: 'pretzel', english: 'pretzel', chinese: '椒盐脆饼', phonetic: '/ˈpret.səl/', themeId: 'food', imageUrl: '/images/food/pretzel.png', example: 'Pretzels are twisted and salty.' },
    { id: 'popcorn', english: 'popcorn', chinese: '爆米花', phonetic: '/ˈpɑːp.kɔːrn/', themeId: 'food', imageUrl: '/images/food/popcorn.png', example: 'Popcorn pops when heated.' },
    { id: 'chips', english: 'chips', chinese: '薯片', phonetic: '/tʃɪps/', themeId: 'food', imageUrl: '/images/food/chips.png', example: 'Chips are crispy and salty.' },
    { id: 'french fries', english: 'french fries', chinese: '薯条', phonetic: '/frentʃ fraɪz/', themeId: 'food', imageUrl: '/images/food/french-fries.png', example: 'French fries are golden.' },
    { id: 'nuts', english: 'nuts', chinese: '坚果', phonetic: '/nʌts/', themeId: 'food', imageUrl: '/images/food/nuts.png', example: 'Nuts are healthy snacks.' },
    { id: 'seeds', english: 'seeds', chinese: '种子', phonetic: '/siːdz/', themeId: 'food', imageUrl: '/images/food/seeds.png', example: 'Seeds grow into plants.' },
    { id: 'beans', english: 'beans', chinese: '豆子', phonetic: '/biːnz/', themeId: 'food', imageUrl: '/images/food/beans.png', example: 'Beans are full of protein.' },
    // 玩具 (toys)
    { id: 'ball', english: 'ball', chinese: '球', phonetic: '/bɔːl/', themeId: 'toys', imageUrl: '/images/toys/ball.png', example: 'I play with a ball.' },
    { id: 'doll', english: 'doll', chinese: '娃娃', phonetic: '/dɑːl/', themeId: 'toys', imageUrl: '/images/toys/doll.png', example: 'The doll has pretty hair.' },
    { id: 'teddy bear', english: 'teddy bear', chinese: '泰迪熊', phonetic: '/ˈted.i ber/', themeId: 'toys', imageUrl: '/images/toys/teddy-bear.png', example: 'My teddy bear is soft and cuddly.' },
    { id: 'car', english: 'car', chinese: '玩具车', phonetic: '/kɑːr/', themeId: 'toys', imageUrl: '/images/toys/car.png', example: 'The toy car is red.' },
    { id: 'train', english: 'train', chinese: '火车', phonetic: '/treɪn/', themeId: 'toys', imageUrl: '/images/toys/train.png', example: 'The train goes choo-choo.' },
    { id: 'airplane', english: 'airplane', chinese: '飞机', phonetic: '/ˈer.pleɪn/', themeId: 'toys', imageUrl: '/images/toys/airplane.png', example: 'The airplane flies in the sky.' },
    { id: 'boat', english: 'boat', chinese: '船', phonetic: '/boʊt/', themeId: 'toys', imageUrl: '/images/toys/boat.png', example: 'The boat floats on water.' },
    { id: 'bicycle', english: 'bicycle', chinese: '自行车', phonetic: '/ˈbaɪ.sɪ.kəl/', themeId: 'toys', imageUrl: '/images/toys/bicycle.png', example: 'I ride my bicycle.' },
    { id: 'scooter', english: 'scooter', chinese: '滑板车', phonetic: '/ˈskuː.tər/', themeId: 'toys', imageUrl: '/images/toys/scooter.png', example: 'A scooter has two wheels.' },
    { id: 'skateboard', english: 'skateboard', chinese: '滑板', phonetic: '/ˈskeɪt.bɔːrd/', themeId: 'toys', imageUrl: '/images/toys/skateboard.png', example: 'Skateboarding is fun.' },
    { id: 'blocks', english: 'blocks', chinese: '积木', phonetic: '/blɑːks/', themeId: 'toys', imageUrl: '/images/toys/blocks.png', example: 'I build towers with blocks.' },
    { id: 'puzzle', english: 'puzzle', chinese: '拼图', phonetic: '/ˈpʌz.əl/', themeId: 'toys', imageUrl: '/images/toys/puzzle.png', example: 'This puzzle has many pieces.' },
    { id: 'kite', english: 'kite', chinese: '风筝', phonetic: '/kaɪt/', themeId: 'toys', imageUrl: '/images/toys/kite.png', example: 'The kite flies high in the wind.' },
    { id: 'yo-yo', english: 'yo-yo', chinese: '悠悠球', phonetic: '/ˈjoʊ.joʊ/', themeId: 'toys', imageUrl: '/images/toys/yo-yo.png', example: 'A yo-yo goes up and down.' },
    { id: 'top', english: 'top', chinese: '陀螺', phonetic: '/tɑːp/', themeId: 'toys', imageUrl: '/images/toys/top.png', example: 'The top spins very fast.' },
    { id: 'marbles', english: 'marbles', chinese: '弹珠', phonetic: '/ˈmɑːr.bəlz/', themeId: 'toys', imageUrl: '/images/toys/marbles.png', example: 'Marbles are small and round.' },
    { id: 'jump rope', english: 'jump rope', chinese: '跳绳', phonetic: '/dʒʌmp roʊp/', themeId: 'toys', imageUrl: '/images/toys/jump-rope.png', example: 'I use a jump rope for exercise.' },
    { id: 'hula hoop', english: 'hula hoop', chinese: '呼啦圈', phonetic: '/ˈhuː.lə huːp/', themeId: 'toys', imageUrl: '/images/toys/hula-hoop.png', example: 'A hula hoop spins around your waist.' },
    { id: 'frisbee', english: 'frisbee', chinese: '飞盘', phonetic: '/ˈfrɪz.bi/', themeId: 'toys', imageUrl: '/images/toys/frisbee.png', example: 'A frisbee flies through the air.' },
    { id: 'boomerang', english: 'boomerang', chinese: '回旋镖', phonetic: '/ˈbuː.mə.ræŋ/', themeId: 'toys', imageUrl: '/images/toys/boomerang.png', example: 'A boomerang comes back to you.' },
    { id: 'slinky', english: 'slinky', chinese: '弹簧玩具', phonetic: '/ˈslɪŋ.ki/', themeId: 'toys', imageUrl: '/images/toys/slinky.png', example: 'A slinky walks down stairs.' },
    { id: 'jack-in-the-box', english: 'jack-in-the-box', chinese: '弹跳盒', phonetic: '/dʒæk ɪn ðə bɑːks/', themeId: 'toys', imageUrl: '/images/toys/jack-in-the-box.png', example: 'Jack pops out of the box.' },
    { id: 'kaleidoscope', english: 'kaleidoscope', chinese: '万花筒', phonetic: '/kəˈlaɪ.də.skoʊp/', themeId: 'toys', imageUrl: '/images/toys/kaleidoscope.png', example: 'A kaleidoscope shows pretty patterns.' },
    { id: 'magic wand', english: 'magic wand', chinese: '魔法棒', phonetic: '/ˈmædʒ.ɪk wɑːnd/', themeId: 'toys', imageUrl: '/images/toys/magic-wand.png', example: 'A magic wand does tricks.' },
    { id: 'puppet', english: 'puppet', chinese: '木偶', phonetic: '/ˈpʌp.ɪt/', themeId: 'toys', imageUrl: '/images/toys/puppet.png', example: 'A puppet dances on strings.' },
    { id: 'robot', english: 'robot', chinese: '机器人', phonetic: '/ˈroʊ.bɑːt/', themeId: 'toys', imageUrl: '/images/toys/robot.png', example: 'The robot moves and talks.' },
    { id: 'action figure', english: 'action figure', chinese: '动作人偶', phonetic: '/ˈæk.ʃən ˈfɪɡ.jər/', themeId: 'toys', imageUrl: '/images/toys/action-figure.png', example: 'This action figure is a superhero.' },
    { id: 'toy soldier', english: 'toy soldier', chinese: '玩具士兵', phonetic: '/tɔɪ ˈsoʊl.dʒər/', themeId: 'toys', imageUrl: '/images/toys/toy-soldier.png', example: 'The toy soldier stands guard.' },
    { id: 'rocking horse', english: 'rocking horse', chinese: '摇摆木马', phonetic: '/ˈrɑː.kɪŋ hɔːrs/', themeId: 'toys', imageUrl: '/images/toys/rocking-horse.png', example: 'The rocking horse rocks back and forth.' },
    { id: 'swing', english: 'swing', chinese: '秋千', phonetic: '/swɪŋ/', themeId: 'toys', imageUrl: '/images/toys/swing.png', example: 'The swing goes high and low.' },
    { id: 'slide', english: 'slide', chinese: '滑梯', phonetic: '/slaɪd/', themeId: 'toys', imageUrl: '/images/toys/slide.png', example: 'I slide down the slide.' },
    { id: 'seesaw', english: 'seesaw', chinese: '跷跷板', phonetic: '/ˈsiː.sɔː/', themeId: 'toys', imageUrl: '/images/toys/seesaw.png', example: 'The seesaw goes up and down.' },
    { id: 'sandbox', english: 'sandbox', chinese: '沙盒', phonetic: '/ˈsænd.bɑːks/', themeId: 'toys', imageUrl: '/images/toys/sandbox.png', example: 'I play in the sandbox.' },
    { id: 'bucket', english: 'bucket', chinese: '桶', phonetic: '/ˈbʌk.ɪt/', themeId: 'toys', imageUrl: '/images/toys/bucket.png', example: 'A bucket holds sand and water.' },
    { id: 'shovel', english: 'shovel', chinese: '铲子', phonetic: '/ˈʃʌv.əl/', themeId: 'toys', imageUrl: '/images/toys/shovel.png', example: 'A shovel digs in the sand.' },
    { id: 'whistle', english: 'whistle', chinese: '哨子', phonetic: '/ˈwɪs.əl/', themeId: 'toys', imageUrl: '/images/toys/whistle.png', example: 'A whistle makes a loud sound.' },
    { id: 'harmonica', english: 'harmonica', chinese: '口琴', phonetic: '/hɑːrˈmɑː.nɪ.kə/', themeId: 'toys', imageUrl: '/images/toys/harmonica.png', example: 'A harmonica plays music.' },
    { id: 'drum', english: 'drum', chinese: '鼓', phonetic: '/drʌm/', themeId: 'toys', imageUrl: '/images/toys/drum.png', example: 'A drum makes a boom sound.' },
    { id: 'xylophone', english: 'xylophone', chinese: '木琴', phonetic: '/ˈzaɪ.lə.foʊn/', themeId: 'toys', imageUrl: '/images/toys/xylophone.png', example: 'A xylophone has colorful keys.' },
    { id: 'tambourine', english: 'tambourine', chinese: '铃鼓', phonetic: '/ˌtæm.bəˈriːn/', themeId: 'toys', imageUrl: '/images/toys/tambourine.png', example: 'A tambourine jingles when shaken.' },
    { id: 'maracas', english: 'maracas', chinese: '沙锤', phonetic: '/məˈrɑː.kəz/', themeId: 'toys', imageUrl: '/images/toys/maracas.png', example: 'Maracas shake and rattle.' },
    { id: 'coloring book', english: 'coloring book', chinese: '涂色书', phonetic: '/ˈkʌl.ər.ɪŋ bʊk/', themeId: 'toys', imageUrl: '/images/toys/coloring-book.png', example: 'A coloring book has pictures to color.' },
    { id: 'crayons', english: 'crayons', chinese: '蜡笔', phonetic: '/ˈkreɪ.ɑːnz/', themeId: 'toys', imageUrl: '/images/toys/crayons.png', example: 'Crayons come in many colors.' },
    { id: 'markers', english: 'markers', chinese: '马克笔', phonetic: '/ˈmɑːr.kərz/', themeId: 'toys', imageUrl: '/images/toys/markers.png', example: 'Markers draw bright lines.' },
    { id: 'paint', english: 'paint', chinese: '颜料', phonetic: '/peɪnt/', themeId: 'toys', imageUrl: '/images/toys/paint.png', example: 'Paint makes colorful pictures.' },
    { id: 'paintbrush', english: 'paintbrush', chinese: '画笔', phonetic: '/ˈpeɪnt.brʌʃ/', themeId: 'toys', imageUrl: '/images/toys/paintbrush.png', example: 'A paintbrush spreads paint.' },
    { id: 'easel', english: 'easel', chinese: '画架', phonetic: '/ˈiː.zəl/', themeId: 'toys', imageUrl: '/images/toys/easel.png', example: 'An easel holds paper for painting.' },
    // 学校 (school)
    { id: 'school', english: 'school', chinese: '学校', phonetic: '/skuːl/', themeId: 'school', imageUrl: '/images/school/school.png', example: 'I go to school every day.' },
    { id: 'teacher', english: 'teacher', chinese: '老师', phonetic: '/ˈtiː.tʃər/', themeId: 'school', imageUrl: '/images/school/teacher.png', example: 'My teacher is very kind.' },
    { id: 'student', english: 'student', chinese: '学生', phonetic: '/ˈstuː.dənt/', themeId: 'school', imageUrl: '/images/school/student.png', example: 'I am a good student.' },
    { id: 'classroom', english: 'classroom', chinese: '教室', phonetic: '/ˈklæs.ruːm/', themeId: 'school', imageUrl: '/images/school/classroom.png', example: 'Our classroom is bright.' },
    { id: 'desk', english: 'desk', chinese: '课桌', phonetic: '/desk/', themeId: 'school', imageUrl: '/images/school/desk.png', example: 'I sit at my desk.' },
    { id: 'chair', english: 'chair', chinese: '椅子', phonetic: '/tʃer/', themeId: 'school', imageUrl: '/images/school/chair.png', example: 'The chair is comfortable.' },
    { id: 'blackboard', english: 'blackboard', chinese: '黑板', phonetic: '/ˈblæk.bɔːrd/', themeId: 'school', imageUrl: '/images/school/blackboard.png', example: 'The teacher writes on the blackboard.' },
    { id: 'chalk', english: 'chalk', chinese: '粉笔', phonetic: '/tʃɔːk/', themeId: 'school', imageUrl: '/images/school/chalk.png', example: 'White chalk writes on blackboard.' },
    { id: 'eraser', english: 'eraser', chinese: '橡皮擦', phonetic: '/ɪˈreɪ.sər/', themeId: 'school', imageUrl: '/images/school/eraser.png', example: 'I use an eraser to fix mistakes.' },
    { id: 'pencil', english: 'pencil', chinese: '铅笔', phonetic: '/ˈpen.səl/', themeId: 'school', imageUrl: '/images/school/pencil.png', example: 'I write with a pencil.' },
    { id: 'pen', english: 'pen', chinese: '钢笔', phonetic: '/pen/', themeId: 'school', imageUrl: '/images/school/pen.png', example: 'A pen has blue ink.' },
    { id: 'paper', english: 'paper', chinese: '纸', phonetic: '/ˈpeɪ.pər/', themeId: 'school', imageUrl: '/images/school/paper.png', example: 'I write on white paper.' },
    { id: 'notebook', english: 'notebook', chinese: '笔记本', phonetic: '/ˈnoʊt.bʊk/', themeId: 'school', imageUrl: '/images/school/notebook.png', example: 'I write notes in my notebook.' },
    { id: 'book', english: 'book', chinese: '书', phonetic: '/bʊk/', themeId: 'school', imageUrl: '/images/school/book.png', example: 'I read a book every day.' },
    { id: 'backpack', english: 'backpack', chinese: '背包', phonetic: '/ˈbæk.pæk/', themeId: 'school', imageUrl: '/images/school/backpack.png', example: 'I carry my books in a backpack.' },
    { id: 'lunchbox', english: 'lunchbox', chinese: '饭盒', phonetic: '/ˈlʌntʃ.bɑːks/', themeId: 'school', imageUrl: '/images/school/lunchbox.png', example: 'My lunchbox has sandwiches.' },
    { id: 'ruler', english: 'ruler', chinese: '尺子', phonetic: '/ˈruː.lər/', themeId: 'school', imageUrl: '/images/school/ruler.png', example: 'A ruler measures length.' },
    { id: 'calculator', english: 'calculator', chinese: '计算器', phonetic: '/ˈkæl.kjə.leɪ.tər/', themeId: 'school', imageUrl: '/images/school/calculator.png', example: 'A calculator does math.' },
    { id: 'computer', english: 'computer', chinese: '电脑', phonetic: '/kəmˈpjuː.tər/', themeId: 'school', imageUrl: '/images/school/computer.png', example: 'I use a computer for homework.' },
    { id: 'library', english: 'library', chinese: '图书馆', phonetic: '/ˈlaɪ.brer.i/', themeId: 'school', imageUrl: '/images/school/library.png', example: 'The library has many books.' },
    { id: 'gym', english: 'gym', chinese: '体育馆', phonetic: '/dʒɪm/', themeId: 'school', imageUrl: '/images/school/gym.png', example: 'We play sports in the gym.' },
    { id: 'playground', english: 'playground', chinese: '操场', phonetic: '/ˈpleɪ.ɡraʊnd/', themeId: 'school', imageUrl: '/images/school/playground.png', example: 'I play on the playground at recess.' },
    { id: 'cafeteria', english: 'cafeteria', chinese: '食堂', phonetic: '/ˌkæf.əˈtɪr.i.ə/', themeId: 'school', imageUrl: '/images/school/cafeteria.png', example: 'I eat lunch in the cafeteria.' },
    { id: 'office', english: 'office', chinese: '办公室', phonetic: '/ˈɑː.fɪs/', themeId: 'school', imageUrl: '/images/school/office.png', example: 'The principal works in the office.' },
    { id: 'principal', english: 'principal', chinese: '校长', phonetic: '/ˈprɪn.sə.pəl/', themeId: 'school', imageUrl: '/images/school/principal.png', example: 'The principal runs the school.' },
    { id: 'homework', english: 'homework', chinese: '家庭作业', phonetic: '/ˈhoʊm.wɜːrk/', themeId: 'school', imageUrl: '/images/school/homework.png', example: 'I do my homework after school.' },
    { id: 'test', english: 'test', chinese: '考试', phonetic: '/test/', themeId: 'school', imageUrl: '/images/school/test.png', example: 'I study hard for the test.' },
    { id: 'grade', english: 'grade', chinese: '成绩', phonetic: '/ɡreɪd/', themeId: 'school', imageUrl: '/images/school/grade.png', example: 'I got a good grade on my test.' },
    { id: 'recess', english: 'recess', chinese: '课间休息', phonetic: '/ˈriː.ses/', themeId: 'school', imageUrl: '/images/school/recess.png', example: 'I play during recess.' },
    { id: 'bell', english: 'bell', chinese: '铃声', phonetic: '/bel/', themeId: 'school', imageUrl: '/images/school/bell.png', example: 'The bell rings for class.' },
    { id: 'locker', english: 'locker', chinese: '储物柜', phonetic: '/ˈlɑː.kər/', themeId: 'school', imageUrl: '/images/school/locker.png', example: 'I keep my books in my locker.' },
    { id: 'bus', english: 'bus', chinese: '校车', phonetic: '/bʌs/', themeId: 'school', imageUrl: '/images/school/bus.png', example: 'I ride the school bus.' },
    { id: 'science', english: 'science', chinese: '科学', phonetic: '/ˈsaɪ.əns/', themeId: 'school', imageUrl: '/images/school/science.png', example: 'Science class is fun.' },
    { id: 'math', english: 'math', chinese: '数学', phonetic: '/mæθ/', themeId: 'school', imageUrl: '/images/school/math.png', example: 'Math helps me count.' },
    { id: 'english', english: 'english', chinese: '英语', phonetic: '/ˈɪŋ.ɡlɪʃ/', themeId: 'school', imageUrl: '/images/school/english.png', example: 'I learn English at school.' },
    { id: 'art', english: 'art', chinese: '美术', phonetic: '/ɑːrt/', themeId: 'school', imageUrl: '/images/school/art.png', example: 'I paint pictures in art class.' },
    { id: 'music', english: 'music', chinese: '音乐', phonetic: '/ˈmjuː.zɪk/', themeId: 'school', imageUrl: '/images/school/music.png', example: 'I sing songs in music class.' },
    { id: 'history', english: 'history', chinese: '历史', phonetic: '/ˈhɪs.tər.i/', themeId: 'school', imageUrl: '/images/school/history.png', example: 'History tells us about the past.' },
    { id: 'geography', english: 'geography', chinese: '地理', phonetic: '/dʒiˈɑː.ɡrə.fi/', themeId: 'school', imageUrl: '/images/school/geography.png', example: 'Geography teaches us about countries.' },
    { id: 'physical education', english: 'physical education', chinese: '体育', phonetic: '/ˈfɪz.ɪ.kəl ˌed.jʊˈkeɪ.ʃən/', themeId: 'school', imageUrl: '/images/school/physical-education.png', example: 'Physical education keeps us healthy.' },
    // 交通工具 (transportation)
    { id: 'car', english: 'car', chinese: '汽车', phonetic: '/kɑːr/', themeId: 'transportation', imageUrl: '/images/transportation/car.png', example: 'I ride in a car to school.' },
    { id: 'bus', english: 'bus', chinese: '公交车', phonetic: '/bʌs/', themeId: 'transportation', imageUrl: '/images/transportation/bus.png', example: 'The bus takes me to school.' },
    { id: 'train', english: 'train', chinese: '火车', phonetic: '/treɪn/', themeId: 'transportation', imageUrl: '/images/transportation/train.png', example: 'The train goes very fast.' },
    { id: 'airplane', english: 'airplane', chinese: '飞机', phonetic: '/ˈer.pleɪn/', themeId: 'transportation', imageUrl: '/images/transportation/airplane.png', example: 'The airplane flies in the sky.' },
    { id: 'boat', english: 'boat', chinese: '船', phonetic: '/boʊt/', themeId: 'transportation', imageUrl: '/images/transportation/boat.png', example: 'The boat floats on water.' },
    { id: 'ship', english: 'ship', chinese: '轮船', phonetic: '/ʃɪp/', themeId: 'transportation', imageUrl: '/images/transportation/ship.png', example: 'A big ship crosses the ocean.' },
    { id: 'bicycle', english: 'bicycle', chinese: '自行车', phonetic: '/ˈbaɪ.sɪ.kəl/', themeId: 'transportation', imageUrl: '/images/transportation/bicycle.png', example: 'I ride my bicycle to the park.' },
    { id: 'motorcycle', english: 'motorcycle', chinese: '摩托车', phonetic: '/ˈmoʊ.tər.saɪ.kəl/', themeId: 'transportation', imageUrl: '/images/transportation/motorcycle.png', example: 'A motorcycle has two wheels.' },
    { id: 'scooter', english: 'scooter', chinese: '滑板车', phonetic: '/ˈskuː.tər/', themeId: 'transportation', imageUrl: '/images/transportation/scooter.png', example: 'A scooter is fun to ride.' },
    { id: 'skateboard', english: 'skateboard', chinese: '滑板', phonetic: '/ˈskeɪt.bɔːrd/', themeId: 'transportation', imageUrl: '/images/transportation/skateboard.png', example: 'I skate on my skateboard.' },
    { id: 'taxi', english: 'taxi', chinese: '出租车', phonetic: '/ˈtæk.si/', themeId: 'transportation', imageUrl: '/images/transportation/taxi.png', example: 'I take a taxi to the airport.' },
    { id: 'truck', english: 'truck', chinese: '卡车', phonetic: '/trʌk/', themeId: 'transportation', imageUrl: '/images/transportation/truck.png', example: 'The truck carries heavy things.' },
    { id: 'van', english: 'van', chinese: '面包车', phonetic: '/væn/', themeId: 'transportation', imageUrl: '/images/transportation/van.png', example: 'A van carries many people.' },
    { id: 'ambulance', english: 'ambulance', chinese: '救护车', phonetic: '/ˈæm.bjə.ləns/', themeId: 'transportation', imageUrl: '/images/transportation/ambulance.png', example: 'An ambulance helps sick people.' },
    { id: 'fire truck', english: 'fire truck', chinese: '消防车', phonetic: '/ˈfaɪər trʌk/', themeId: 'transportation', imageUrl: '/images/transportation/fire-truck.png', example: 'A fire truck puts out fires.' },
    { id: 'police car', english: 'police car', chinese: '警车', phonetic: '/pəˈliːs kɑːr/', themeId: 'transportation', imageUrl: '/images/transportation/police-car.png', example: 'A police car catches bad people.' },
    { id: 'helicopter', english: 'helicopter', chinese: '直升机', phonetic: '/ˈhel.ɪ.kɑːp.tər/', themeId: 'transportation', imageUrl: '/images/transportation/helicopter.png', example: 'A helicopter flies with spinning blades.' },
    { id: 'subway', english: 'subway', chinese: '地铁', phonetic: '/ˈsʌb.weɪ/', themeId: 'transportation', imageUrl: '/images/transportation/subway.png', example: 'The subway runs underground.' },
    { id: 'tram', english: 'tram', chinese: '有轨电车', phonetic: '/træm/', themeId: 'transportation', imageUrl: '/images/transportation/tram.png', example: 'A tram runs on tracks in the city.' },
    { id: 'ferry', english: 'ferry', chinese: '渡轮', phonetic: '/ˈfer.i/', themeId: 'transportation', imageUrl: '/images/transportation/ferry.png', example: 'A ferry carries people across water.' },
    { id: 'yacht', english: 'yacht', chinese: '游艇', phonetic: '/jɑːt/', themeId: 'transportation', imageUrl: '/images/transportation/yacht.png', example: 'A yacht is a fancy boat.' },
    { id: 'sailboat', english: 'sailboat', chinese: '帆船', phonetic: '/ˈseɪl.boʊt/', themeId: 'transportation', imageUrl: '/images/transportation/sailboat.png', example: 'A sailboat uses wind to move.' },
    { id: 'canoe', english: 'canoe', chinese: '独木舟', phonetic: '/kəˈnuː/', themeId: 'transportation', imageUrl: '/images/transportation/canoe.png', example: 'A canoe is a small boat.' },
    { id: 'kayak', english: 'kayak', chinese: '皮划艇', phonetic: '/ˈkaɪ.æk/', themeId: 'transportation', imageUrl: '/images/transportation/kayak.png', example: 'A kayak is for one person.' },
    { id: 'jet ski', english: 'jet ski', chinese: '水上摩托', phonetic: '/dʒet skiː/', themeId: 'transportation', imageUrl: '/images/transportation/jet-ski.png', example: 'A jet ski is fast on water.' },
    { id: 'hot air balloon', english: 'hot air balloon', chinese: '热气球', phonetic: '/hɑːt er bəˈluːn/', themeId: 'transportation', imageUrl: '/images/transportation/hot-air-balloon.png', example: 'A hot air balloon floats in the sky.' },
    { id: 'rocket', english: 'rocket', chinese: '火箭', phonetic: '/ˈrɑː.kɪt/', themeId: 'transportation', imageUrl: '/images/transportation/rocket.png', example: 'A rocket goes to space.' },
    { id: 'space shuttle', english: 'space shuttle', chinese: '航天飞机', phonetic: '/speɪs ˈʃʌt.əl/', themeId: 'transportation', imageUrl: '/images/transportation/space-shuttle.png', example: 'A space shuttle goes to space.' },
    { id: 'sled', english: 'sled', chinese: '雪橇', phonetic: '/sled/', themeId: 'transportation', imageUrl: '/images/transportation/sled.png', example: 'A sled slides on snow.' },
    { id: 'snowmobile', english: 'snowmobile', chinese: '雪地摩托', phonetic: '/ˈsnoʊ.mə.biːl/', themeId: 'transportation', imageUrl: '/images/transportation/snowmobile.png', example: 'A snowmobile drives on snow.' },
    { id: 'horse', english: 'horse', chinese: '马', phonetic: '/hɔːrs/', themeId: 'transportation', imageUrl: '/images/transportation/horse.png', example: 'People used to ride horses.' },
    { id: 'camel', english: 'camel', chinese: '骆驼', phonetic: '/ˈkæm.əl/', themeId: 'transportation', imageUrl: '/images/transportation/camel.png', example: 'A camel carries people in the desert.' },
    { id: 'elephant', english: 'elephant', chinese: '大象', phonetic: '/ˈel.ə.fənt/', themeId: 'transportation', imageUrl: '/images/transportation/elephant.png', example: 'An elephant can carry people.' },
    { id: 'donkey', english: 'donkey', chinese: '驴', phonetic: '/ˈdɑːŋ.ki/', themeId: 'transportation', imageUrl: '/images/transportation/donkey.png', example: 'A donkey carries things.' },
    { id: 'wheelchair', english: 'wheelchair', chinese: '轮椅', phonetic: '/ˈwiːl.tʃer/', themeId: 'transportation', imageUrl: '/images/transportation/wheelchair.png', example: 'A wheelchair helps people move.' },
    { id: 'stroller', english: 'stroller', chinese: '婴儿车', phonetic: '/ˈstroʊ.lər/', themeId: 'transportation', imageUrl: '/images/transportation/stroller.png', example: 'A stroller carries babies.' },
    { id: 'wagon', english: 'wagon', chinese: '手推车', phonetic: '/ˈwæɡ.ən/', themeId: 'transportation', imageUrl: '/images/transportation/wagon.png', example: 'A wagon carries toys.' },
    { id: 'wheelbarrow', english: 'wheelbarrow', chinese: '独轮车', phonetic: '/ˈwiːl.bær.oʊ/', themeId: 'transportation', imageUrl: '/images/transportation/wheelbarrow.png', example: 'A wheelbarrow carries dirt.' },
    { id: 'tractor', english: 'tractor', chinese: '拖拉机', phonetic: '/ˈtræk.tər/', themeId: 'transportation', imageUrl: '/images/transportation/tractor.png', example: 'A tractor works on farms.' },
    { id: 'bulldozer', english: 'bulldozer', chinese: '推土机', phonetic: '/ˈbʊl.doʊ.zər/', themeId: 'transportation', imageUrl: '/images/transportation/bulldozer.png', example: 'A bulldozer moves dirt.' },
    { id: 'crane', english: 'crane', chinese: '起重机', phonetic: '/kreɪn/', themeId: 'transportation', imageUrl: '/images/transportation/crane.png', example: 'A crane lifts heavy things.' },
    { id: 'excavator', english: 'excavator', chinese: '挖掘机', phonetic: '/ˈek.skə.veɪ.tər/', themeId: 'transportation', imageUrl: '/images/transportation/excavator.png', example: 'An excavator digs holes.' },
    { id: 'forklift', english: 'forklift', chinese: '叉车', phonetic: '/ˈfɔːrk.lɪft/', themeId: 'transportation', imageUrl: '/images/transportation/forklift.png', example: 'A forklift lifts boxes.' },
    { id: 'golf cart', english: 'golf cart', chinese: '高尔夫球车', phonetic: '/ɡɑːlf kɑːrt/', themeId: 'transportation', imageUrl: '/images/transportation/golf-cart.png', example: 'A golf cart carries golfers.' },
    { id: 'go-kart', english: 'go-kart', chinese: '卡丁车', phonetic: '/ˈɡoʊ.kɑːrt/', themeId: 'transportation', imageUrl: '/images/transportation/go-kart.png', example: 'A go-kart is a small racing car.' },
    { id: 'roller skates', english: 'roller skates', chinese: '轮滑鞋', phonetic: '/ˈroʊ.lər skeɪts/', themeId: 'transportation', imageUrl: '/images/transportation/roller-skates.png', example: 'Roller skates have wheels.' },
    { id: 'ice skates', english: 'ice skates', chinese: '冰鞋', phonetic: '/aɪs skeɪts/', themeId: 'transportation', imageUrl: '/images/transportation/ice-skates.png', example: 'Ice skates slide on ice.' },
    { id: 'skis', english: 'skis', chinese: '滑雪板', phonetic: '/skiːz/', themeId: 'transportation', imageUrl: '/images/transportation/skis.png', example: 'Skis slide on snow.' },
    { id: 'snowboard', english: 'snowboard', chinese: '滑雪板', phonetic: '/ˈsnoʊ.bɔːrd/', themeId: 'transportation', imageUrl: '/images/transportation/snowboard.png', example: 'A snowboard slides on snow.' },
    { id: 'crosswalk', english: 'crosswalk', chinese: '人行横道', phonetic: '/ˈkrɔːs.wɔːk/', themeId: 'transportation', imageUrl: '/images/transportation/crosswalk.png', example: 'We walk on the crosswalk.' },
    { id: 'traffic-light', english: 'traffic light', chinese: '红绿灯', phonetic: '/ˈtræf.ɪk laɪt/', themeId: 'transportation', imageUrl: '/images/transportation/traffic-light.png', example: 'Stop at the red traffic light.' },
    { id: 'stop-sign', english: 'stop sign', chinese: '停车标志', phonetic: '/stɑːp saɪn/', themeId: 'transportation', imageUrl: '/images/transportation/stop-sign.png', example: 'The stop sign says “STOP”.' },
    { id: 'seat-belt', english: 'seat belt', chinese: '安全带', phonetic: '/siːt belt/', themeId: 'transportation', imageUrl: '/images/transportation/seat-belt.png', example: 'I wear a seat belt in the car.' },
    { id: 'helmet', english: 'helmet', chinese: '头盔', phonetic: '/ˈhel.mɪt/', themeId: 'transportation', imageUrl: '/images/transportation/helmet.png', example: 'I wear a helmet when I ride.' },
    { id: 'parking-lot', english: 'parking lot', chinese: '停车场', phonetic: '/ˈpɑːr.kɪŋ lɑːt/', themeId: 'transportation', imageUrl: '/images/transportation/parking-lot.png', example: 'The car is in the parking lot.' },
    { id: 'gas-station', english: 'gas station', chinese: '加油站', phonetic: '/ˈɡæs ˌsteɪ.ʃən/', themeId: 'transportation', imageUrl: '/images/transportation/gas-station.png', example: 'We stop at the gas station.' },
    { id: 'bridge', english: 'bridge', chinese: '桥', phonetic: '/brɪdʒ/', themeId: 'transportation', imageUrl: '/images/transportation/bridge.png', example: 'The bus crosses the bridge.' },
    { id: 'tunnel', english: 'tunnel', chinese: '隧道', phonetic: '/ˈtʌn.əl/', themeId: 'transportation', imageUrl: '/images/transportation/tunnel.png', example: 'The train goes through a tunnel.' },
    { id: 'ticket', english: 'ticket', chinese: '车票', phonetic: '/ˈtɪk.ɪt/', themeId: 'transportation', imageUrl: '/images/transportation/ticket.png', example: 'I buy a subway ticket.' },
    // 天气 (weather)
    { id: 'sunny', english: 'sunny', chinese: '晴天', phonetic: '/ˈsʌn.i/', themeId: 'weather', imageUrl: '/images/weather/sunny.png', example: 'It is sunny today.' },
    { id: 'cloudy', english: 'cloudy', chinese: '多云', phonetic: '/ˈklaʊ.di/', themeId: 'weather', imageUrl: '/images/weather/cloudy.png', example: 'The sky is cloudy.' },
    { id: 'rainy', english: 'rainy', chinese: '雨天', phonetic: '/ˈreɪ.ni/', themeId: 'weather', imageUrl: '/images/weather/rainy.png', example: 'It is rainy outside.' },
    { id: 'snowy', english: 'snowy', chinese: '雪天', phonetic: '/ˈsnoʊ.i/', themeId: 'weather', imageUrl: '/images/weather/snowy.png', example: 'It is snowy in winter.' },
    { id: 'windy', english: 'windy', chinese: '刮风', phonetic: '/ˈwɪn.di/', themeId: 'weather', imageUrl: '/images/weather/windy.png', example: 'It is windy today.' },
    { id: 'foggy', english: 'foggy', chinese: '雾天', phonetic: '/ˈfɑː.ɡi/', themeId: 'weather', imageUrl: '/images/weather/foggy.png', example: 'It is foggy in the morning.' },
    { id: 'stormy', english: 'stormy', chinese: '暴风雨', phonetic: '/ˈstɔːr.mi/', themeId: 'weather', imageUrl: '/images/weather/stormy.png', example: 'It is stormy tonight.' },
    { id: 'hot', english: 'hot', chinese: '炎热', phonetic: '/hɑːt/', themeId: 'weather', imageUrl: '/images/weather/hot.png', example: 'It is hot in summer.' },
    { id: 'cold', english: 'cold', chinese: '寒冷', phonetic: '/koʊld/', themeId: 'weather', imageUrl: '/images/weather/cold.png', example: 'It is cold in winter.' },
    { id: 'warm', english: 'warm', chinese: '温暖', phonetic: '/wɔːrm/', themeId: 'weather', imageUrl: '/images/weather/warm.png', example: 'It is warm in spring.' },
    { id: 'cool', english: 'cool', chinese: '凉爽', phonetic: '/kuːl/', themeId: 'weather', imageUrl: '/images/weather/cool.png', example: 'It is cool in autumn.' },
    { id: 'sun', english: 'sun', chinese: '太阳', phonetic: '/sʌn/', themeId: 'weather', imageUrl: '/images/weather/sun.png', example: 'The sun shines bright.' },
    { id: 'moon', english: 'moon', chinese: '月亮', phonetic: '/muːn/', themeId: 'weather', imageUrl: '/images/weather/moon.png', example: 'The moon glows at night.' },
    { id: 'star', english: 'star', chinese: '星星', phonetic: '/stɑːr/', themeId: 'weather', imageUrl: '/images/weather/star.png', example: 'Stars twinkle in the sky.' },
    { id: 'cloud', english: 'cloud', chinese: '云', phonetic: '/klaʊd/', themeId: 'weather', imageUrl: '/images/weather/cloud.png', example: 'White clouds float in the sky.' },
    { id: 'rain', english: 'rain', chinese: '雨', phonetic: '/reɪn/', themeId: 'weather', imageUrl: '/images/weather/rain.png', example: 'Rain falls from the sky.' },
    { id: 'snow', english: 'snow', chinese: '雪', phonetic: '/snoʊ/', themeId: 'weather', imageUrl: '/images/weather/snow.png', example: 'Snow is white and cold.' },
    { id: 'wind', english: 'wind', chinese: '风', phonetic: '/wɪnd/', themeId: 'weather', imageUrl: '/images/weather/wind.png', example: 'Wind blows the leaves.' },
    { id: 'fog', english: 'fog', chinese: '雾', phonetic: '/fɑːɡ/', themeId: 'weather', imageUrl: '/images/weather/fog.png', example: 'Fog makes it hard to see.' },
    { id: 'storm', english: 'storm', chinese: '暴风雨', phonetic: '/stɔːrm/', themeId: 'weather', imageUrl: '/images/weather/storm.png', example: 'A storm has thunder and lightning.' },
    { id: 'lightning', english: 'lightning', chinese: '闪电', phonetic: '/ˈlaɪt.nɪŋ/', themeId: 'weather', imageUrl: '/images/weather/lightning.png', example: 'Lightning flashes in the sky.' },
    { id: 'thunder', english: 'thunder', chinese: '雷声', phonetic: '/ˈθʌn.dər/', themeId: 'weather', imageUrl: '/images/weather/thunder.png', example: 'Thunder makes a loud sound.' },
    { id: 'rainbow', english: 'rainbow', chinese: '彩虹', phonetic: '/ˈreɪn.boʊ/', themeId: 'weather', imageUrl: '/images/weather/rainbow.png', example: 'A rainbow has many colors.' },
    { id: 'umbrella', english: 'umbrella', chinese: '雨伞', phonetic: '/ʌmˈbrel.ə/', themeId: 'weather', imageUrl: '/images/weather/umbrella.png', example: 'I use an umbrella in the rain.' },
    { id: 'raincoat', english: 'raincoat', chinese: '雨衣', phonetic: '/ˈreɪn.koʊt/', themeId: 'weather', imageUrl: '/images/weather/raincoat.png', example: 'I wear a raincoat when it rains.' },
    { id: 'thermometer', english: 'thermometer', chinese: '温度计', phonetic: '/θərˈmɑː.mə.tər/', themeId: 'weather', imageUrl: '/images/weather/thermometer.png', example: 'A thermometer measures temperature.' },
    { id: 'temperature', english: 'temperature', chinese: '温度', phonetic: '/ˈtem.pər.ə.tʃər/', themeId: 'weather', imageUrl: '/images/weather/temperature.png', example: 'The temperature is high today.' },
    { id: 'weather', english: 'weather', chinese: '天气', phonetic: '/ˈweð.ər/', themeId: 'weather', imageUrl: '/images/weather/weather.png', example: 'The weather is nice today.' },
    { id: 'season', english: 'season', chinese: '季节', phonetic: '/ˈsiː.zən/', themeId: 'weather', imageUrl: '/images/weather/season.png', example: 'Spring is my favorite season.' },
    { id: 'spring', english: 'spring', chinese: '春天', phonetic: '/sprɪŋ/', themeId: 'weather', imageUrl: '/images/weather/spring.png', example: 'Spring has flowers and rain.' },
    { id: 'summer', english: 'summer', chinese: '夏天', phonetic: '/ˈsʌm.ər/', themeId: 'weather', imageUrl: '/images/weather/summer.png', example: 'Summer is hot and sunny.' },
    { id: 'autumn', english: 'autumn', chinese: '秋天', phonetic: '/ˈɑː.təm/', themeId: 'weather', imageUrl: '/images/weather/autumn.png', example: 'Autumn has colorful leaves.' },
    { id: 'winter', english: 'winter', chinese: '冬天', phonetic: '/ˈwɪn.tər/', themeId: 'weather', imageUrl: '/images/weather/winter.png', example: 'Winter is cold and snowy.' },
    { id: 'ice', english: 'ice', chinese: '冰', phonetic: '/aɪs/', themeId: 'weather', imageUrl: '/images/weather/ice.png', example: 'Ice is cold and slippery.' },
    { id: 'frost', english: 'frost', chinese: '霜', phonetic: '/frɑːst/', themeId: 'weather', imageUrl: '/images/weather/frost.png', example: 'Frost covers the grass in winter.' },
    { id: 'hail', english: 'hail', chinese: '冰雹', phonetic: '/heɪl/', themeId: 'weather', imageUrl: '/images/weather/hail.png', example: 'Hail falls from storm clouds.' },
    { id: 'sleet', english: 'sleet', chinese: '雨夹雪', phonetic: '/sliːt/', themeId: 'weather', imageUrl: '/images/weather/sleet.png', example: 'Sleet is rain mixed with snow.' },
    { id: 'dew', english: 'dew', chinese: '露水', phonetic: '/duː/', themeId: 'weather', imageUrl: '/images/weather/dew.png', example: 'Dew forms on grass in the morning.' },
    { id: 'mist', english: 'mist', chinese: '薄雾', phonetic: '/mɪst/', themeId: 'weather', imageUrl: '/images/weather/mist.png', example: 'Mist makes everything look soft.' },
    { id: 'haze', english: 'haze', chinese: '霾', phonetic: '/heɪz/', themeId: 'weather', imageUrl: '/images/weather/haze.png', example: 'Haze makes the air look gray.' },
    { id: 'humidity', english: 'humidity', chinese: '湿度', phonetic: '/hjuːˈmɪd.ə.ti/', themeId: 'weather', imageUrl: '/images/weather/humidity.png', example: 'High humidity makes the air feel sticky.' },
    { id: 'pressure', english: 'pressure', chinese: '气压', phonetic: '/ˈpreʃ.ər/', themeId: 'weather', imageUrl: '/images/weather/pressure.png', example: 'Air pressure affects the weather.' },
    { id: 'forecast', english: 'forecast', chinese: '天气预报', phonetic: '/ˈfɔːr.kæst/', themeId: 'weather', imageUrl: '/images/weather/forecast.png', example: 'The weather forecast says it will rain.' },
    { id: 'meteorologist', english: 'meteorologist', chinese: '气象学家', phonetic: '/ˌmiː.ti.əˈrɑː.lə.dʒɪst/', themeId: 'weather', imageUrl: '/images/weather/meteorologist.png', example: 'A meteorologist studies the weather.' },
    { id: 'climate', english: 'climate', chinese: '气候', phonetic: '/ˈklaɪ.mət/', themeId: 'weather', imageUrl: '/images/weather/climate.png', example: 'The climate in this area is warm.' },
    { id: 'global warming', english: 'global warming', chinese: '全球变暖', phonetic: '/ˈɡloʊ.bəl ˈwɔːr.mɪŋ/', themeId: 'weather', imageUrl: '/images/weather/global-warming.png', example: 'Global warming affects the climate.' },
    { id: 'greenhouse effect', english: 'greenhouse effect', chinese: '温室效应', phonetic: '/ˈɡriːn.haʊs ɪˈfekt/', themeId: 'weather', imageUrl: '/images/weather/greenhouse-effect.png', example: 'The greenhouse effect warms the Earth.' },
    { id: 'ozone layer', english: 'ozone layer', chinese: '臭氧层', phonetic: '/ˈoʊ.zoʊn ˈleɪ.ər/', themeId: 'weather', imageUrl: '/images/weather/ozone-layer.png', example: 'The ozone layer protects us from the sun.' },
    { id: 'pollution', english: 'pollution', chinese: '污染', phonetic: '/pəˈluː.ʃən/', themeId: 'weather', imageUrl: '/images/weather/pollution.png', example: 'Air pollution affects the weather.' },
    { id: 'environment', english: 'environment', chinese: '环境', phonetic: '/ɪnˈvaɪ.rən.mənt/', themeId: 'weather', imageUrl: '/images/weather/environment.png', example: 'We should protect the environment.' },
    { id: 'nature', english: 'nature', chinese: '自然', phonetic: '/ˈneɪ.tʃər/', themeId: 'weather', imageUrl: '/images/weather/nature.png', example: 'Nature provides us with weather.' },
    { id: 'earth', english: 'earth', chinese: '地球', phonetic: '/ɜːrθ/', themeId: 'weather', imageUrl: '/images/weather/earth.png', example: 'The Earth has different weather patterns.' },
    { id: 'atmosphere', english: 'atmosphere', chinese: '大气层', phonetic: '/ˈæt.mə.sfɪr/', themeId: 'weather', imageUrl: '/images/weather/atmosphere.png', example: 'The atmosphere surrounds the Earth.' },
    { id: 'sky', english: 'sky', chinese: '天空', phonetic: '/skaɪ/', themeId: 'weather', imageUrl: '/images/weather/sky.png', example: 'The sky is blue and clear.' },
    { id: 'horizon', english: 'horizon', chinese: '地平线', phonetic: '/həˈraɪ.zən/', themeId: 'weather', imageUrl: '/images/weather/horizon.png', example: 'The sun sets on the horizon.' },
    { id: 'sunrise', english: 'sunrise', chinese: '日出', phonetic: '/ˈsʌn.raɪz/', themeId: 'weather', imageUrl: '/images/weather/sunrise.png', example: 'The sunrise is beautiful in the morning.' },
    { id: 'sunset', english: 'sunset', chinese: '日落', phonetic: '/ˈsʌn.set/', themeId: 'weather', imageUrl: '/images/weather/sunset.png', example: 'The sunset is colorful in the evening.' },
    { id: 'dawn', english: 'dawn', chinese: '黎明', phonetic: '/dɔːn/', themeId: 'weather', imageUrl: '/images/weather/dawn.png', example: 'Dawn is the beginning of the day.' },
    { id: 'dusk', english: 'dusk', chinese: '黄昏', phonetic: '/dʌsk/', themeId: 'weather', imageUrl: '/images/weather/dusk.png', example: 'Dusk is the end of the day.' },
    { id: 'day', english: 'day', chinese: '白天', phonetic: '/deɪ/', themeId: 'weather', imageUrl: '/images/weather/day.png', example: 'The day is bright and sunny.' },
    { id: 'night', english: 'night', chinese: '夜晚', phonetic: '/naɪt/', themeId: 'weather', imageUrl: '/images/weather/night.png', example: 'The night is dark and quiet.' },
    { id: 'morning', english: 'morning', chinese: '早晨', phonetic: '/ˈmɔːr.nɪŋ/', themeId: 'weather', imageUrl: '/images/weather/morning.png', example: 'The morning is fresh and cool.' },
    { id: 'afternoon', english: 'afternoon', chinese: '下午', phonetic: '/ˌæf.tərˈnuːn/', themeId: 'weather', imageUrl: '/images/weather/afternoon.png', example: 'The afternoon is warm and bright.' },
    { id: 'evening', english: 'evening', chinese: '傍晚', phonetic: '/ˈiːv.nɪŋ/', themeId: 'weather', imageUrl: '/images/weather/evening.png', example: 'The evening is peaceful and calm.' },
    { id: 'midnight', english: 'midnight', chinese: '午夜', phonetic: '/ˈmɪd.naɪt/', themeId: 'weather', imageUrl: '/images/weather/midnight.png', example: 'Midnight is the middle of the night.' },
    { id: 'noon', english: 'noon', chinese: '中午', phonetic: '/nuːn/', themeId: 'weather', imageUrl: '/images/weather/noon.png', example: 'Noon is the middle of the day.' },
    // 服装 (clothing)
    { id: 'shirt', english: 'shirt', chinese: '衬衫', phonetic: '/ʃɜːrt/', themeId: 'clothing', imageUrl: '/images/clothing/shirt.png', example: 'I wear a shirt to school.' },
    { id: 't-shirt', english: 't-shirt', chinese: 'T恤', phonetic: '/ˈtiː.ʃɜːrt/', themeId: 'clothing', imageUrl: '/images/clothing/t-shirt.png', example: 'I wear a t-shirt when it is hot.' },
    { id: 'dress', english: 'dress', chinese: '连衣裙', phonetic: '/dres/', themeId: 'clothing', imageUrl: '/images/clothing/dress.png', example: 'I wear a dress in summer.' },
    { id: 'skirt', english: 'skirt', chinese: '裙子', phonetic: '/skɜːrt/', themeId: 'clothing', imageUrl: '/images/clothing/skirt.png', example: 'I wear a skirt in summer.' },
    { id: 'pants', english: 'pants', chinese: '裤子', phonetic: '/pænts/', themeId: 'clothing', imageUrl: '/images/clothing/pants.png', example: 'I wear pants when it is cool.' },
    { id: 'shorts', english: 'shorts', chinese: '短裤', phonetic: '/ʃɔːrts/', themeId: 'clothing', imageUrl: '/images/clothing/shorts.png', example: 'I wear shorts in summer.' },
    { id: 'jeans', english: 'jeans', chinese: '牛仔裤', phonetic: '/dʒiːnz/', themeId: 'clothing', imageUrl: '/images/clothing/jeans.png', example: 'Jeans are blue pants.' },
    { id: 'jacket', english: 'jacket', chinese: '夹克', phonetic: '/ˈdʒæk.ɪt/', themeId: 'clothing', imageUrl: '/images/clothing/jacket.png', example: 'I wear a jacket when it is cool.' },
    { id: 'coat', english: 'coat', chinese: '外套', phonetic: '/koʊt/', themeId: 'clothing', imageUrl: '/images/clothing/coat.png', example: 'I wear a coat in winter.' },
    { id: 'sweater', english: 'sweater', chinese: '毛衣', phonetic: '/ˈswet.ər/', themeId: 'clothing', imageUrl: '/images/clothing/sweater.png', example: 'I wear a sweater when it is cold.' },
    { id: 'hoodie', english: 'hoodie', chinese: '连帽衫', phonetic: '/ˈhʊd.i/', themeId: 'clothing', imageUrl: '/images/clothing/hoodie.png', example: 'A hoodie has a hood.' },
    { id: 'blouse', english: 'blouse', chinese: '女式衬衫', phonetic: '/blaʊs/', themeId: 'clothing', imageUrl: '/images/clothing/blouse.png', example: 'A blouse is a fancy shirt.' },
    { id: 'tank top', english: 'tank top', chinese: '背心', phonetic: '/tæŋk tɑːp/', themeId: 'clothing', imageUrl: '/images/clothing/tank-top.png', example: 'A tank top has no sleeves.' },
    { id: 'polo shirt', english: 'polo shirt', chinese: ' polo衫', phonetic: '/ˈpoʊ.loʊ ʃɜːrt/', themeId: 'clothing', imageUrl: '/images/clothing/polo-shirt.png', example: 'A polo shirt has a collar.' },
    { id: 'cardigan', english: 'cardigan', chinese: '开襟毛衣', phonetic: '/ˈkɑːr.dɪ.ɡən/', themeId: 'clothing', imageUrl: '/images/clothing/cardigan.png', example: 'A cardigan opens in the front.' },
    { id: 'vest', english: 'vest', chinese: '马甲', phonetic: '/vest/', themeId: 'clothing', imageUrl: '/images/clothing/vest.png', example: 'A vest has no sleeves.' },
    { id: 'suit', english: 'suit', chinese: '西装', phonetic: '/suːt/', themeId: 'clothing', imageUrl: '/images/clothing/suit.png', example: 'A suit is formal clothing.' },
    { id: 'tie', english: 'tie', chinese: '领带', phonetic: '/taɪ/', themeId: 'clothing', imageUrl: '/images/clothing/tie.png', example: 'A tie goes around the neck.' },
    { id: 'bow tie', english: 'bow tie', chinese: '蝴蝶结', phonetic: '/boʊ taɪ/', themeId: 'clothing', imageUrl: '/images/clothing/bow-tie.png', example: 'A bow tie looks like a bow.' },
    { id: 'uniform', english: 'uniform', chinese: '制服', phonetic: '/ˈjuː.nə.fɔːrm/', themeId: 'clothing', imageUrl: '/images/clothing/uniform.png', example: 'Students wear uniforms to school.' },
    { id: 'overalls', english: 'overalls', chinese: '工装裤', phonetic: '/ˈoʊ.vər.ɔːlz/', themeId: 'clothing', imageUrl: '/images/clothing/overalls.png', example: 'Overalls cover the whole body.' },
    { id: 'leggings', english: 'leggings', chinese: '紧身裤', phonetic: '/ˈleɡ.ɪŋz/', themeId: 'clothing', imageUrl: '/images/clothing/leggings.png', example: 'Leggings are tight pants.' },
    { id: 'sweatpants', english: 'sweatpants', chinese: '运动裤', phonetic: '/ˈswet.pænts/', themeId: 'clothing', imageUrl: '/images/clothing/sweatpants.png', example: 'Sweatpants are comfortable pants.' },
    { id: 'cargo pants', english: 'cargo pants', chinese: '工装裤', phonetic: '/ˈkɑːr.ɡoʊ pænts/', themeId: 'clothing', imageUrl: '/images/clothing/cargo-pants.png', example: 'Cargo pants have many pockets.' },
    { id: 'capri pants', english: 'capri pants', chinese: '七分裤', phonetic: '/kəˈpriː pænts/', themeId: 'clothing', imageUrl: '/images/clothing/capri-pants.png', example: 'Capri pants are short pants.' },
    { id: 'cargo shorts', english: 'cargo shorts', chinese: '工装短裤', phonetic: '/ˈkɑːr.ɡoʊ ʃɔːrts/', themeId: 'clothing', imageUrl: '/images/clothing/cargo-shorts.png', example: 'Cargo shorts have many pockets.' },
    { id: 'swim trunks', english: 'swim trunks', chinese: '游泳裤', phonetic: '/swɪm trʌŋks/', themeId: 'clothing', imageUrl: '/images/clothing/swim-trunks.png', example: 'Swim trunks are for swimming.' },
    { id: 'bikini', english: 'bikini', chinese: '比基尼', phonetic: '/bɪˈkiː.ni/', themeId: 'clothing', imageUrl: '/images/clothing/bikini.png', example: 'A bikini is a swimsuit.' },
    { id: 'swimsuit', english: 'swimsuit', chinese: '泳衣', phonetic: '/ˈswɪm.suːt/', themeId: 'clothing', imageUrl: '/images/clothing/swimsuit.png', example: 'A swimsuit is for swimming.' },
    { id: 'underwear', english: 'underwear', chinese: '内衣', phonetic: '/ˈʌn.dər.wer/', themeId: 'clothing', imageUrl: '/images/clothing/underwear.png', example: 'Underwear goes under clothes.' },
    { id: 'bra', english: 'bra', chinese: '胸罩', phonetic: '/brɑː/', themeId: 'clothing', imageUrl: '/images/clothing/bra.png', example: 'A bra supports the chest.' },
    { id: 'panties', english: 'panties', chinese: '内裤', phonetic: '/ˈpæn.tiz/', themeId: 'clothing', imageUrl: '/images/clothing/panties.png', example: 'Panties are underwear for girls.' },
    { id: 'briefs', english: 'briefs', chinese: '内裤', phonetic: '/briːfs/', themeId: 'clothing', imageUrl: '/images/clothing/briefs.png', example: 'Briefs are underwear for boys.' },
    { id: 'boxers', english: 'boxers', chinese: '平角内裤', phonetic: '/ˈbɑːk.sərz/', themeId: 'clothing', imageUrl: '/images/clothing/boxers.png', example: 'Boxers are loose underwear.' },
    { id: 'socks', english: 'socks', chinese: '袜子', phonetic: '/sɑːks/', themeId: 'clothing', imageUrl: '/images/clothing/socks.png', example: 'I wear socks with my shoes.' },
    { id: 'stockings', english: 'stockings', chinese: '长筒袜', phonetic: '/ˈstɑː.kɪŋz/', themeId: 'clothing', imageUrl: '/images/clothing/stockings.png', example: 'Stockings are long socks.' },
    { id: 'tights', english: 'tights', chinese: '紧身袜', phonetic: '/taɪts/', themeId: 'clothing', imageUrl: '/images/clothing/tights.png', example: 'Tights are tight stockings.' },
    { id: 'shoes', english: 'shoes', chinese: '鞋子', phonetic: '/ʃuːz/', themeId: 'clothing', imageUrl: '/images/clothing/shoes.png', example: 'I wear shoes every day.' },
    { id: 'sneakers', english: 'sneakers', chinese: '运动鞋', phonetic: '/ˈsniː.kərz/', themeId: 'clothing', imageUrl: '/images/clothing/sneakers.png', example: 'Sneakers are comfortable shoes.' },
    { id: 'boots', english: 'boots', chinese: '靴子', phonetic: '/buːts/', themeId: 'clothing', imageUrl: '/images/clothing/boots.png', example: 'Boots cover the ankle.' },
    { id: 'sandals', english: 'sandals', chinese: '凉鞋', phonetic: '/ˈsæn.dəlz/', themeId: 'clothing', imageUrl: '/images/clothing/sandals.png', example: 'Sandals are open shoes.' },
    { id: 'flip flops', english: 'flip flops', chinese: '人字拖', phonetic: '/ˈflɪp flɑːps/', themeId: 'clothing', imageUrl: '/images/clothing/flip-flops.png', example: 'Flip flops are beach shoes.' },
    { id: 'high heels', english: 'high heels', chinese: '高跟鞋', phonetic: '/haɪ hiːlz/', themeId: 'clothing', imageUrl: '/images/clothing/high-heels.png', example: 'High heels make you taller.' },
    { id: 'flats', english: 'flats', chinese: '平底鞋', phonetic: '/flæts/', themeId: 'clothing', imageUrl: '/images/clothing/flats.png', example: 'Flats have no heel.' },
    { id: 'loafers', english: 'loafers', chinese: '乐福鞋', phonetic: '/ˈloʊ.fərz/', themeId: 'clothing', imageUrl: '/images/clothing/loafers.png', example: 'Loafers are slip-on shoes.' },
    { id: 'hat', english: 'hat', chinese: '帽子', phonetic: '/hæt/', themeId: 'clothing', imageUrl: '/images/clothing/hat.png', example: 'I wear a hat in the sun.' },
    { id: 'cap', english: 'cap', chinese: '棒球帽', phonetic: '/kæp/', themeId: 'clothing', imageUrl: '/images/clothing/cap.png', example: 'A cap has a visor.' },
    { id: 'beanie', english: 'beanie', chinese: '毛线帽', phonetic: '/ˈbiː.ni/', themeId: 'clothing', imageUrl: '/images/clothing/beanie.png', example: 'A beanie is a warm hat.' },
    { id: 'scarf', english: 'scarf', chinese: '围巾', phonetic: '/skɑːrf/', themeId: 'clothing', imageUrl: '/images/clothing/scarf.png', example: 'I wear a scarf when it is cold.' },
    { id: 'gloves', english: 'gloves', chinese: '手套', phonetic: '/ɡlʌvz/', themeId: 'clothing', imageUrl: '/images/clothing/gloves.png', example: 'I wear gloves in winter.' },
    { id: 'mittens', english: 'mittens', chinese: '连指手套', phonetic: '/ˈmɪt.ənz/', themeId: 'clothing', imageUrl: '/images/clothing/mittens.png', example: 'Mittens keep fingers together.' },
    { id: 'belt', english: 'belt', chinese: '腰带', phonetic: '/belt/', themeId: 'clothing', imageUrl: '/images/clothing/belt.png', example: 'A belt holds up pants.' },
    { id: 'suspenders', english: 'suspenders', chinese: '背带', phonetic: '/səˈspen.dərz/', themeId: 'clothing', imageUrl: '/images/clothing/suspenders.png', example: 'Suspenders hold up pants.' },
    { id: 'apron', english: 'apron', chinese: '围裙', phonetic: '/ˈeɪ.prən/', themeId: 'clothing', imageUrl: '/images/clothing/apron.png', example: 'An apron protects clothes.' },
    { id: 'pajamas', english: 'pajamas', chinese: '睡衣', phonetic: '/pəˈdʒæ.məz/', themeId: 'clothing', imageUrl: '/images/clothing/pajamas.png', example: 'I wear pajamas to bed.' },
    { id: 'nightgown', english: 'nightgown', chinese: '睡袍', phonetic: '/ˈnaɪt.ɡaʊn/', themeId: 'clothing', imageUrl: '/images/clothing/nightgown.png', example: 'A nightgown is a long dress.' },
    { id: 'robe', english: 'robe', chinese: '浴袍', phonetic: '/roʊb/', themeId: 'clothing', imageUrl: '/images/clothing/robe.png', example: 'A robe is worn after bathing.' },
    { id: 'bathrobe', english: 'bathrobe', chinese: '浴衣', phonetic: '/ˈbæθ.roʊb/', themeId: 'clothing', imageUrl: '/images/clothing/bathrobe.png', example: 'A bathrobe is worn after bathing.' },
    { id: 'sunglasses', english: 'sunglasses', chinese: '太阳镜', phonetic: '/ˈsʌn.ɡlæs.ɪz/', themeId: 'clothing', imageUrl: '/images/clothing/sunglasses.png', example: 'I wear sunglasses in the sun.' },
    { id: 'glasses', english: 'glasses', chinese: '眼镜', phonetic: '/ˈɡlæs.ɪz/', themeId: 'clothing', imageUrl: '/images/clothing/glasses.png', example: 'Glasses help you see better.' },
    { id: 'watch', english: 'watch', chinese: '手表', phonetic: '/wɑːtʃ/', themeId: 'clothing', imageUrl: '/images/clothing/watch.png', example: 'A watch tells time.' },
    { id: 'bracelet', english: 'bracelet', chinese: '手镯', phonetic: '/ˈbreɪ.slət/', themeId: 'clothing', imageUrl: '/images/clothing/bracelet.png', example: 'A bracelet goes on the wrist.' },
    { id: 'necklace', english: 'necklace', chinese: '项链', phonetic: '/ˈnek.ləs/', themeId: 'clothing', imageUrl: '/images/clothing/necklace.png', example: 'A necklace goes around the neck.' },
    { id: 'earrings', english: 'earrings', chinese: '耳环', phonetic: '/ˈɪr.ɪŋz/', themeId: 'clothing', imageUrl: '/images/clothing/earrings.png', example: 'Earrings go in the ears.' },
    { id: 'ring', english: 'ring', chinese: '戒指', phonetic: '/rɪŋ/', themeId: 'clothing', imageUrl: '/images/clothing/ring.png', example: 'A ring goes on the finger.' },
    { id: 'rain-boots', english: 'rain boots', chinese: '雨靴', phonetic: '/reɪn buːts/', themeId: 'clothing', imageUrl: '/images/clothing/rain-boots.png', example: 'I wear rain boots on rainy days.' },
    { id: 'slippers', english: 'slippers', chinese: '拖鞋', phonetic: '/ˈslɪp.ərz/', themeId: 'clothing', imageUrl: '/images/clothing/slippers.png', example: 'I wear slippers at home.' },
    { id: 'earmuffs', english: 'earmuffs', chinese: '耳罩', phonetic: '/ˈɪr.mʌfs/', themeId: 'clothing', imageUrl: '/images/clothing/earmuffs.png', example: 'Earmuffs keep ears warm.' },
    { id: 'face-mask', english: 'face mask', chinese: '口罩', phonetic: '/feɪs mæsk/', themeId: 'clothing', imageUrl: '/images/clothing/face-mask.png', example: 'I wear a face mask.' },
    { id: 'poncho', english: 'poncho', chinese: '雨披', phonetic: '/ˈpɑːn.tʃoʊ/', themeId: 'clothing', imageUrl: '/images/clothing/poncho.png', example: 'A poncho keeps you dry.' },
    { id: 'windbreaker', english: 'windbreaker', chinese: '防风外套', phonetic: '/ˈwɪndˌbreɪ.kər/', themeId: 'clothing', imageUrl: '/images/clothing/windbreaker.png', example: 'I wear a windbreaker on windy days.' },
    { id: 'rain-pants', english: 'rain pants', chinese: '雨裤', phonetic: '/reɪn pænts/', themeId: 'clothing', imageUrl: '/images/clothing/rain-pants.png', example: 'Rain pants keep legs dry.' },
    { id: 'safety-vest', english: 'safety vest', chinese: '反光背心', phonetic: '/ˈseɪf.ti vest/', themeId: 'clothing', imageUrl: '/images/clothing/safety-vest.png', example: 'A safety vest helps drivers see you.' },
    { id: 'life-jacket', english: 'life jacket', chinese: '救生衣', phonetic: '/laɪf ˈdʒæk.ɪt/', themeId: 'clothing', imageUrl: '/images/clothing/life-jacket.png', example: 'Wear a life jacket on a boat.' },
    { id: 'swimming-goggles', english: 'swimming goggles', chinese: '游泳镜', phonetic: '/ˈswɪm.ɪŋ ˈɡɑː.ɡəlz/', themeId: 'clothing', imageUrl: '/images/clothing/swimming-goggles.png', example: 'Swimming goggles protect eyes.' },
 // 动作动词 (actions)
 { id: 'run', english: 'run', chinese: '跑', phonetic: '/rʌn/', themeId: 'actions', imageUrl: '/images/actions/run.png', example: 'I run in the park.' },
 { id: 'jump', english: 'jump', chinese: '跳', phonetic: '/dʒʌmp/', themeId: 'actions', imageUrl: '/images/actions/jump.png', example: 'I jump high.' },
 { id: 'eat', english: 'eat', chinese: '吃', phonetic: '/iːt/', themeId: 'actions', imageUrl: '/images/actions/eat.png', example: 'I eat breakfast.' },
 { id: 'play', english: 'play', chinese: '玩', phonetic: '/pleɪ/', themeId: 'actions', imageUrl: '/images/actions/play.png', example: 'I play with friends.' },
 { id: 'sing', english: 'sing', chinese: '唱', phonetic: '/sɪŋ/', themeId: 'actions', imageUrl: '/images/actions/sing.png', example: 'I sing a song.' },
 { id: 'dance', english: 'dance', chinese: '跳舞', phonetic: '/dæns/', themeId: 'actions', imageUrl: '/images/actions/dance.png', example: 'I dance at the party.' },
 { id: 'walk', english: 'walk', chinese: '走', phonetic: '/wɔːk/', themeId: 'actions', imageUrl: '/images/actions/walk.png', example: 'I walk to school.' },
 { id: 'swim', english: 'swim', chinese: '游泳', phonetic: '/swɪm/', themeId: 'actions', imageUrl: '/images/actions/swim.png', example: 'I swim in the pool.' },
 { id: 'sleep', english: 'sleep', chinese: '睡觉', phonetic: '/sliːp/', themeId: 'actions', imageUrl: '/images/actions/sleep.png', example: 'I sleep at night.' },
 { id: 'read', english: 'read', chinese: '读', phonetic: '/riːd/', themeId: 'actions', imageUrl: '/images/actions/read.png', example: 'I read a book.' },
 { id: 'write', english: 'write', chinese: '写', phonetic: '/raɪt/', themeId: 'actions', imageUrl: '/images/actions/write.png', example: 'I write my name.' },
 { id: 'draw', english: 'draw', chinese: '画', phonetic: '/drɔː/', themeId: 'actions', imageUrl: '/images/actions/draw.png', example: 'I draw a picture.' },
 { id: 'cook', english: 'cook', chinese: '做饭', phonetic: '/kʊk/', themeId: 'actions', imageUrl: '/images/actions/cook.png', example: 'I cook dinner.' },
 { id: 'drink', english: 'drink', chinese: '喝', phonetic: '/drɪŋk/', themeId: 'actions', imageUrl: '/images/actions/drink.png', example: 'I drink water.' },
 { id: 'talk', english: 'talk', chinese: '说话', phonetic: '/tɔːk/', themeId: 'actions', imageUrl: '/images/actions/talk.png', example: 'I talk to my mom.' },
 { id: 'listen', english: 'listen', chinese: '听', phonetic: '/ˈlɪs.ən/', themeId: 'actions', imageUrl: '/images/actions/listen.png', example: 'I listen to music.' },
 { id: 'watch', english: 'watch', chinese: '看', phonetic: '/wɑːtʃ/', themeId: 'actions', imageUrl: '/images/actions/watch.png', example: 'I watch TV.' },
 { id: 'smile', english: 'smile', chinese: '微笑', phonetic: '/smaɪl/', themeId: 'actions', imageUrl: '/images/actions/smile.png', example: 'I smile when I am happy.' },
 { id: 'laugh', english: 'laugh', chinese: '笑', phonetic: '/læf/', themeId: 'actions', imageUrl: '/images/actions/laugh.png', example: 'I laugh at jokes.' },
 { id: 'cry', english: 'cry', chinese: '哭', phonetic: '/kraɪ/', themeId: 'actions', imageUrl: '/images/actions/cry.png', example: 'I cry when I am sad.' },
 { id: 'hug', english: 'hug', chinese: '拥抱', phonetic: '/hʌɡ/', themeId: 'actions', imageUrl: '/images/actions/hug.png', example: 'I hug my family.' },
 { id: 'wave', english: 'wave', chinese: '挥手', phonetic: '/weɪv/', themeId: 'actions', imageUrl: '/images/actions/wave.png', example: 'I wave goodbye.' },
 { id: 'clap', english: 'clap', chinese: '拍手', phonetic: '/klæp/', themeId: 'actions', imageUrl: '/images/actions/clap.png', example: 'I clap my hands.' },
 { id: 'point', english: 'point', chinese: '指', phonetic: '/pɔɪnt/', themeId: 'actions', imageUrl: '/images/actions/point.png', example: 'I point at the bird.' },
 { id: 'sit', english: 'sit', chinese: '坐', phonetic: '/sɪt/', themeId: 'actions', imageUrl: '/images/actions/sit.png', example: 'I sit on the chair.' },
 { id: 'stand', english: 'stand', chinese: '站', phonetic: '/stænd/', themeId: 'actions', imageUrl: '/images/actions/stand.png', example: 'I stand up straight.' },
 { id: 'climb', english: 'climb', chinese: '爬', phonetic: '/klaɪm/', themeId: 'actions', imageUrl: '/images/actions/climb.png', example: 'I climb the tree.' },
 { id: 'throw', english: 'throw', chinese: '扔', phonetic: '/θroʊ/', themeId: 'actions', imageUrl: '/images/actions/throw.png', example: 'I throw the ball.' },
 { id: 'catch', english: 'catch', chinese: '接', phonetic: '/kætʃ/', themeId: 'actions', imageUrl: '/images/actions/catch.png', example: 'I catch the ball.' },
 { id: 'kick', english: 'kick', chinese: '踢', phonetic: '/kɪk/', themeId: 'actions', imageUrl: '/images/actions/kick.png', example: 'I kick the ball.' },
 { id: 'ride', english: 'ride', chinese: '骑', phonetic: '/raɪd/', themeId: 'actions', imageUrl: '/images/actions/ride.png', example: 'I ride my bike.' },
 { id: 'fly', english: 'fly', chinese: '飞', phonetic: '/flaɪ/', themeId: 'actions', imageUrl: '/images/actions/fly.png', example: 'Birds fly in the sky.' },
 { id: 'drive', english: 'drive', chinese: '开车', phonetic: '/draɪv/', themeId: 'actions', imageUrl: '/images/actions/drive.png', example: 'I drive the car.' },
 { id: 'open', english: 'open', chinese: '打开', phonetic: '/ˈoʊ.pən/', themeId: 'actions', imageUrl: '/images/actions/open.png', example: 'I open the door.' },
 { id: 'close', english: 'close', chinese: '关闭', phonetic: '/kloʊz/', themeId: 'actions', imageUrl: '/images/actions/close.png', example: 'I close the window.' },
 { id: 'push', english: 'push', chinese: '推', phonetic: '/pʊʃ/', themeId: 'actions', imageUrl: '/images/actions/push.png', example: 'I push the cart.' },
 { id: 'pull', english: 'pull', chinese: '拉', phonetic: '/pʊl/', themeId: 'actions', imageUrl: '/images/actions/pull.png', example: 'I pull the rope.' },
 { id: 'lift', english: 'lift', chinese: '举起', phonetic: '/lɪft/', themeId: 'actions', imageUrl: '/images/actions/lift.png', example: 'I lift the box.' },
 { id: 'carry', english: 'carry', chinese: '携带', phonetic: '/ˈkær.i/', themeId: 'actions', imageUrl: '/images/actions/carry.png', example: 'I carry my bag.' },
 { id: 'drop', english: 'drop', chinese: '掉落', phonetic: '/drɑːp/', themeId: 'actions', imageUrl: '/images/actions/drop.png', example: 'I drop the pencil.' },
 { id: 'pick', english: 'pick', chinese: '捡', phonetic: '/pɪk/', themeId: 'actions', imageUrl: '/images/actions/pick.png', example: 'I pick up the toy.' },
 { id: 'hold', english: 'hold', chinese: '握住', phonetic: '/hoʊld/', themeId: 'actions', imageUrl: '/images/actions/hold.png', example: 'I hold the cup.' },
 { id: 'touch', english: 'touch', chinese: '触摸', phonetic: '/tʌtʃ/', themeId: 'actions', imageUrl: '/images/actions/touch.png', example: 'I touch the cat.' },
 { id: 'feel', english: 'feel', chinese: '感觉', phonetic: '/fiːl/', themeId: 'actions', imageUrl: '/images/actions/feel.png', example: 'I feel the soft fur.' },
 { id: 'taste', english: 'taste', chinese: '品尝', phonetic: '/teɪst/', themeId: 'actions', imageUrl: '/images/actions/taste.png', example: 'I taste the soup.' },
 { id: 'smell', english: 'smell', chinese: '闻', phonetic: '/smel/', themeId: 'actions', imageUrl: '/images/actions/smell.png', example: 'I smell the flowers.' },
 { id: 'see', english: 'see', chinese: '看见', phonetic: '/siː/', themeId: 'actions', imageUrl: '/images/actions/see.png', example: 'I see the rainbow.' },
 { id: 'look', english: 'look', chinese: '看', phonetic: '/lʊk/', themeId: 'actions', imageUrl: '/images/actions/look.png', example: 'I look at the picture.' },
 { id: 'think', english: 'think', chinese: '想', phonetic: '/θɪŋk/', themeId: 'actions', imageUrl: '/images/actions/think.png', example: 'I think about my homework.' },
 { id: 'remember', english: 'remember', chinese: '记住', phonetic: '/rɪˈmem.bər/', themeId: 'actions', imageUrl: '/images/actions/remember.png', example: 'I remember my friend.' },
 { id: 'forget', english: 'forget', chinese: '忘记', phonetic: '/fərˈɡet/', themeId: 'actions', imageUrl: '/images/actions/forget.png', example: 'I forget my keys.' },
 { id: 'learn', english: 'learn', chinese: '学习', phonetic: '/lɜːrn/', themeId: 'actions', imageUrl: '/images/actions/learn.png', example: 'I learn new words.' },
 { id: 'teach', english: 'teach', chinese: '教', phonetic: '/tiːtʃ/', themeId: 'actions', imageUrl: '/images/actions/teach.png', example: 'I teach my sister.' },
 { id: 'help', english: 'help', chinese: '帮助', phonetic: '/help/', themeId: 'actions', imageUrl: '/images/actions/help.png', example: 'I help my mom.' },
 { id: 'work', english: 'work', chinese: '工作', phonetic: '/wɜːrk/', themeId: 'actions', imageUrl: '/images/actions/work.png', example: 'I work hard.' },
 { id: 'study', english: 'study', chinese: '学习', phonetic: '/ˈstʌd.i/', themeId: 'actions', imageUrl: '/images/actions/study.png', example: 'I study for the test.' },
 { id: 'practice', english: 'practice', chinese: '练习', phonetic: '/ˈpræk.tɪs/', themeId: 'actions', imageUrl: '/images/actions/practice.png', example: 'I practice piano.' },
 { id: 'try', english: 'try', chinese: '尝试', phonetic: '/traɪ/', themeId: 'actions', imageUrl: '/images/actions/try.png', example: 'I try my best.' },
 { id: 'win', english: 'win', chinese: '赢', phonetic: '/wɪn/', themeId: 'actions', imageUrl: '/images/actions/win.png', example: 'I win the game.' },
 { id: 'lose', english: 'lose', chinese: '输', phonetic: '/luːz/', themeId: 'actions', imageUrl: '/images/actions/lose.png', example: 'I lose the game.' },
 { id: 'start', english: 'start', chinese: '开始', phonetic: '/stɑːrt/', themeId: 'actions', imageUrl: '/images/actions/start.png', example: 'I start my homework.' },
 { id: 'stop', english: 'stop', chinese: '停止', phonetic: '/stɑːp/', themeId: 'actions', imageUrl: '/images/actions/stop.png', example: 'I stop the car.' },
 { id: 'finish', english: 'finish', chinese: '完成', phonetic: '/ˈfɪn.ɪʃ/', themeId: 'actions', imageUrl: '/images/actions/finish.png', example: 'I finish my work.' },
 { id: 'begin', english: 'begin', chinese: '开始', phonetic: '/bɪˈɡɪn/', themeId: 'actions', imageUrl: '/images/actions/begin.png', example: 'I begin to read.' },
 { id: 'end', english: 'end', chinese: '结束', phonetic: '/end/', themeId: 'actions', imageUrl: '/images/actions/end.png', example: 'The story ends.' },
 { id: 'continue', english: 'continue', chinese: '继续', phonetic: '/kənˈtɪn.juː/', themeId: 'actions', imageUrl: '/images/actions/continue.png', example: 'I continue reading.' },
 { id: 'wait', english: 'wait', chinese: '等待', phonetic: '/weɪt/', themeId: 'actions', imageUrl: '/images/actions/wait.png', example: 'I wait for the bus.' },
 { id: 'hurry', english: 'hurry', chinese: '匆忙', phonetic: '/ˈhɜːr.i/', themeId: 'actions', imageUrl: '/images/actions/hurry.png', example: 'I hurry to school.' },
 { id: 'slow', english: 'slow', chinese: '慢', phonetic: '/sloʊ/', themeId: 'actions', imageUrl: '/images/actions/slow.png', example: 'I slow down.' },
 { id: 'fast', english: 'fast', chinese: '快', phonetic: '/fæst/', themeId: 'actions', imageUrl: '/images/actions/fast.png', example: 'I run fast.' },
 { id: 'turn', english: 'turn', chinese: '转', phonetic: '/tɜːrn/', themeId: 'actions', imageUrl: '/images/actions/turn.png', example: 'I turn left.' },
 { id: 'move', english: 'move', chinese: '移动', phonetic: '/muːv/', themeId: 'actions', imageUrl: '/images/actions/move.png', example: 'I move the chair.' },
 { id: 'stay', english: 'stay', chinese: '停留', phonetic: '/steɪ/', themeId: 'actions', imageUrl: '/images/actions/stay.png', example: 'I stay home.' },
 { id: 'leave', english: 'leave', chinese: '离开', phonetic: '/liːv/', themeId: 'actions', imageUrl: '/images/actions/leave.png', example: 'I leave the house.' },
 { id: 'arrive', english: 'arrive', chinese: '到达', phonetic: '/əˈraɪv/', themeId: 'actions', imageUrl: '/images/actions/arrive.png', example: 'I arrive at school.' },
 { id: 'return', english: 'return', chinese: '返回', phonetic: '/rɪˈtɜːrn/', themeId: 'actions', imageUrl: '/images/actions/return.png', example: 'I return home.' },
 { id: 'visit', english: 'visit', chinese: '访问', phonetic: '/ˈvɪz.ɪt/', themeId: 'actions', imageUrl: '/images/actions/visit.png', example: 'I visit my grandma.' },
 { id: 'meet', english: 'meet', chinese: '遇见', phonetic: '/miːt/', themeId: 'actions', imageUrl: '/images/actions/meet.png', example: 'I meet my friend.' },
 { id: 'greet', english: 'greet', chinese: '问候', phonetic: '/ɡriːt/', themeId: 'actions', imageUrl: '/images/actions/greet.png', example: 'I greet my teacher.' },
 { id: 'say', english: 'say', chinese: '说', phonetic: '/seɪ/', themeId: 'actions', imageUrl: '/images/actions/say.png', example: 'I say hello.' },
 { id: 'tell', english: 'tell', chinese: '告诉', phonetic: '/tel/', themeId: 'actions', imageUrl: '/images/actions/tell.png', example: 'I tell a story.' },
 { id: 'ask', english: 'ask', chinese: '问', phonetic: '/æsk/', themeId: 'actions', imageUrl: '/images/actions/ask.png', example: 'I ask a question.' },
 { id: 'answer', english: 'answer', chinese: '回答', phonetic: '/ˈæn.sər/', themeId: 'actions', imageUrl: '/images/actions/answer.png', example: 'I answer the question.' },
 { id: 'call', english: 'call', chinese: '叫', phonetic: '/kɔːl/', themeId: 'actions', imageUrl: '/images/actions/call.png', example: 'I call my mom.' },
 { id: 'phone', english: 'phone', chinese: '打电话', phonetic: '/foʊn/', themeId: 'actions', imageUrl: '/images/actions/phone.png', example: 'I phone my friend.' },
 { id: 'text', english: 'text', chinese: '发短信', phonetic: '/tekst/', themeId: 'actions', imageUrl: '/images/actions/text.png', example: 'I text my friend.' },
 { id: 'email', english: 'email', chinese: '发邮件', phonetic: '/ˈiː.meɪl/', themeId: 'actions', imageUrl: '/images/actions/email.png', example: 'I email my teacher.' },
 { id: 'send', english: 'send', chinese: '发送', phonetic: '/send/', themeId: 'actions', imageUrl: '/images/actions/send.png', example: 'I send a message.' },
 { id: 'receive', english: 'receive', chinese: '接收', phonetic: '/rɪˈsiːv/', themeId: 'actions', imageUrl: '/images/actions/receive.png', example: 'I receive a gift.' },
 { id: 'give', english: 'give', chinese: '给', phonetic: '/ɡɪv/', themeId: 'actions', imageUrl: '/images/actions/give.png', example: 'I give a present.' },
 { id: 'take', english: 'take', chinese: '拿', phonetic: '/teɪk/', themeId: 'actions', imageUrl: '/images/actions/take.png', example: 'I take my book.' },
 { id: 'get', english: 'get', chinese: '得到', phonetic: '/ɡet/', themeId: 'actions', imageUrl: '/images/actions/get.png', example: 'I get a prize.' },
 { id: 'buy', english: 'buy', chinese: '买', phonetic: '/baɪ/', themeId: 'actions', imageUrl: '/images/actions/buy.png', example: 'I buy a toy.' },
 { id: 'sell', english: 'sell', chinese: '卖', phonetic: '/sel/', themeId: 'actions', imageUrl: '/images/actions/sell.png', example: 'I sell my old bike.' },
 { id: 'pay', english: 'pay', chinese: '付钱', phonetic: '/peɪ/', themeId: 'actions', imageUrl: '/images/actions/pay.png', example: 'I pay for lunch.' },
 { id: 'cost', english: 'cost', chinese: '花费', phonetic: '/kɔːst/', themeId: 'actions', imageUrl: '/images/actions/cost.png', example: 'The toy costs ten dollars.' },
 { id: 'save', english: 'save', chinese: '节省', phonetic: '/seɪv/', themeId: 'actions', imageUrl: '/images/actions/save.png', example: 'I save money.' },
 { id: 'spend', english: 'spend', chinese: '花费', phonetic: '/spend/', themeId: 'actions', imageUrl: '/images/actions/spend.png', example: 'I spend time reading.' },
 { id: 'earn', english: 'earn', chinese: '赚取', phonetic: '/ɜːrn/', themeId: 'actions', imageUrl: '/images/actions/earn.png', example: 'I earn money.' },
 { id: 'borrow', english: 'borrow', chinese: '借', phonetic: '/ˈbɑːr.oʊ/', themeId: 'actions', imageUrl: '/images/actions/borrow.png', example: 'I borrow a book.' },
 { id: 'lend', english: 'lend', chinese: '借出', phonetic: '/lend/', themeId: 'actions', imageUrl: '/images/actions/lend.png', example: 'I lend my pencil.' },
 { id: 'return', english: 'return', chinese: '归还', phonetic: '/rɪˈtɜːrn/', themeId: 'actions', imageUrl: '/images/actions/return.png', example: 'I return the book.' },
 { id: 'keep', english: 'keep', chinese: '保持', phonetic: '/kiːp/', themeId: 'actions', imageUrl: '/images/actions/keep.png', example: 'I keep my room clean.' },
 { id: 'lose', english: 'lose', chinese: '丢失', phonetic: '/luːz/', themeId: 'actions', imageUrl: '/images/actions/lose.png', example: 'I lose my keys.' },
 { id: 'find', english: 'find', chinese: '找到', phonetic: '/faɪnd/', themeId: 'actions', imageUrl: '/images/actions/find.png', example: 'I find my keys.' },
 { id: 'search', english: 'search', chinese: '搜索', phonetic: '/sɜːrtʃ/', themeId: 'actions', imageUrl: '/images/actions/search.png', example: 'I search for my book.' },
 { id: 'look', english: 'look', chinese: '寻找', phonetic: '/lʊk/', themeId: 'actions', imageUrl: '/images/actions/look.png', example: 'I look for my toy.' },
 { id: 'hide', english: 'hide', chinese: '隐藏', phonetic: '/haɪd/', themeId: 'actions', imageUrl: '/images/actions/hide.png', example: 'I hide behind the tree.' },
 { id: 'show', english: 'show', chinese: '显示', phonetic: '/ʃoʊ/', themeId: 'actions', imageUrl: '/images/actions/show.png', example: 'I show my drawing.' },
 { id: 'share', english: 'share', chinese: '分享', phonetic: '/ʃer/', themeId: 'actions', imageUrl: '/images/actions/share.png', example: 'I share my cookies.' },
 { id: 'choose', english: 'choose', chinese: '选择', phonetic: '/tʃuːz/', themeId: 'actions', imageUrl: '/images/actions/choose.png', example: 'I choose the red one.' },
 { id: 'decide', english: 'decide', chinese: '决定', phonetic: '/dɪˈsaɪd/', themeId: 'actions', imageUrl: '/images/actions/decide.png', example: 'I decide to go home.' },
 { id: 'plan', english: 'plan', chinese: '计划', phonetic: '/plæn/', themeId: 'actions', imageUrl: '/images/actions/plan.png', example: 'I plan my day.' },
 { id: 'prepare', english: 'prepare', chinese: '准备', phonetic: '/prɪˈper/', themeId: 'actions', imageUrl: '/images/actions/prepare.png', example: 'I prepare my lunch.' },
 { id: 'organize', english: 'organize', chinese: '组织', phonetic: '/ˈɔːr.ɡə.naɪz/', themeId: 'actions', imageUrl: '/images/actions/organize.png', example: 'I organize my desk.' },
 { id: 'clean', english: 'clean', chinese: '清洁', phonetic: '/kliːn/', themeId: 'actions', imageUrl: '/images/actions/clean.png', example: 'I clean my room.' },
 { id: 'wash', english: 'wash', chinese: '洗', phonetic: '/wɑːʃ/', themeId: 'actions', imageUrl: '/images/actions/wash.png', example: 'I wash my hands.' },
 { id: 'brush', english: 'brush', chinese: '刷', phonetic: '/brʌʃ/', themeId: 'actions', imageUrl: '/images/actions/brush.png', example: 'I brush my teeth.' },
 { id: 'comb', english: 'comb', chinese: '梳', phonetic: '/koʊm/', themeId: 'actions', imageUrl: '/images/actions/comb.png', example: 'I comb my hair.' },
 { id: 'cut', english: 'cut', chinese: '切', phonetic: '/kʌt/', themeId: 'actions', imageUrl: '/images/actions/cut.png', example: 'I cut the paper.' },
 { id: 'paste', english: 'paste', chinese: '粘贴', phonetic: '/peɪst/', themeId: 'actions', imageUrl: '/images/actions/paste.png', example: 'I paste the picture.' },
 { id: 'glue', english: 'glue', chinese: '胶水', phonetic: '/ɡluː/', themeId: 'actions', imageUrl: '/images/actions/glue.png', example: 'I glue the pieces.' },
 { id: 'tie', english: 'tie', chinese: '系', phonetic: '/taɪ/', themeId: 'actions', imageUrl: '/images/actions/tie.png', example: 'I tie my shoes.' },
 { id: 'untie', english: 'untie', chinese: '解开', phonetic: '/ʌnˈtaɪ/', themeId: 'actions', imageUrl: '/images/actions/untie.png', example: 'I untie my shoes.' },
 { id: 'button', english: 'button', chinese: '扣', phonetic: '/ˈbʌt.ən/', themeId: 'actions', imageUrl: '/images/actions/button.png', example: 'I button my shirt.' },
 { id: 'unbutton', english: 'unbutton', chinese: '解扣', phonetic: '/ʌnˈbʌt.ən/', themeId: 'actions', imageUrl: '/images/actions/unbutton.png', example: 'I unbutton my shirt.' },
 { id: 'zip', english: 'zip', chinese: '拉链', phonetic: '/zɪp/', themeId: 'actions', imageUrl: '/images/actions/zip.png', example: 'I zip my jacket.' },
 { id: 'unzip', english: 'unzip', chinese: '拉开', phonetic: '/ʌnˈzɪp/', themeId: 'actions', imageUrl: '/images/actions/unzip.png', example: 'I unzip my jacket.' },
 { id: 'snap', english: 'snap', chinese: '按扣', phonetic: '/snæp/', themeId: 'actions', imageUrl: '/images/actions/snap.png', example: 'I snap my fingers.' },
 { id: 'click', english: 'click', chinese: '点击', phonetic: '/klɪk/', themeId: 'actions', imageUrl: '/images/actions/click.png', example: 'I click the button.' },
 { id: 'press', english: 'press', chinese: '按', phonetic: '/pres/', themeId: 'actions', imageUrl: '/images/actions/press.png', example: 'I press the doorbell.' },
 { id: 'squeeze', english: 'squeeze', chinese: '挤压', phonetic: '/skwiːz/', themeId: 'actions', imageUrl: '/images/actions/squeeze.png', example: 'I squeeze the lemon.' },
 { id: 'pinch', english: 'pinch', chinese: '捏', phonetic: '/pɪntʃ/', themeId: 'actions', imageUrl: '/images/actions/pinch.png', example: 'I pinch my nose.' },
 { id: 'scratch', english: 'scratch', chinese: '抓', phonetic: '/skrætʃ/', themeId: 'actions', imageUrl: '/images/actions/scratch.png', example: 'I scratch my head.' },
 { id: 'rub', english: 'rub', chinese: '摩擦', phonetic: '/rʌb/', themeId: 'actions', imageUrl: '/images/actions/rub.png', example: 'I rub my eyes.' },
 { id: 'pat', english: 'pat', chinese: '拍', phonetic: '/pæt/', themeId: 'actions', imageUrl: '/images/actions/pat.png', example: 'I pat the dog.' },
    // 情绪表达 (emotions)
    { id: 'happy', english: 'happy', chinese: '开心', phonetic: '/ˈhæp.i/', themeId: 'emotions', imageUrl: '/images/emotions/happy.png', example: 'I am happy when I play.' },
    { id: 'sad', english: 'sad', chinese: '伤心', phonetic: '/sæd/', themeId: 'emotions', imageUrl: '/images/emotions/sad.png', example: 'I feel sad when I cry.' },
    { id: 'angry', english: 'angry', chinese: '生气', phonetic: '/ˈæŋ.ɡri/', themeId: 'emotions', imageUrl: '/images/emotions/angry.png', example: 'I get angry when I am mad.' },
    { id: 'tired', english: 'tired', chinese: '疲倦', phonetic: '/ˈtaɪərd/', themeId: 'emotions', imageUrl: '/images/emotions/tired.png', example: 'I am tired after playing.' },
    { id: 'excited', english: 'excited', chinese: '兴奋', phonetic: '/ɪkˈsaɪ.tɪd/', themeId: 'emotions', imageUrl: '/images/emotions/excited.png', example: 'I am excited about my birthday.' },
    { id: 'scared', english: 'scared', chinese: '害怕', phonetic: '/skerd/', themeId: 'emotions', imageUrl: '/images/emotions/scared.png', example: 'I am scared of the dark.' },
    { id: 'surprised', english: 'surprised', chinese: '惊讶', phonetic: '/sərˈpraɪzd/', themeId: 'emotions', imageUrl: '/images/emotions/surprised.png', example: 'I am surprised by the gift.' },
    { id: 'worried', english: 'worried', chinese: '担心', phonetic: '/ˈwɜːr.id/', themeId: 'emotions', imageUrl: '/images/emotions/worried.png', example: 'I am worried about my test.' },
    { id: 'proud', english: 'proud', chinese: '骄傲', phonetic: '/praʊd/', themeId: 'emotions', imageUrl: '/images/emotions/proud.png', example: 'I am proud of my drawing.' },
    { id: 'shy', english: 'shy', chinese: '害羞', phonetic: '/ʃaɪ/', themeId: 'emotions', imageUrl: '/images/emotions/shy.png', example: 'I feel shy around new people.' },
    { id: 'confused', english: 'confused', chinese: '困惑', phonetic: '/kənˈfjuːzd/', themeId: 'emotions', imageUrl: '/images/emotions/confused.png', example: 'I am confused by the puzzle.' },
    { id: 'calm', english: 'calm', chinese: '平静', phonetic: '/kɑːm/', themeId: 'emotions', imageUrl: '/images/emotions/calm.png', example: 'I feel calm when I rest.' },
    { id: 'nervous', english: 'nervous', chinese: '紧张', phonetic: '/ˈnɜːr.vəs/', themeId: 'emotions', imageUrl: '/images/emotions/nervous.png', example: 'I am nervous before the show.' },
    { id: 'jealous', english: 'jealous', chinese: '嫉妒', phonetic: '/ˈdʒel.əs/', themeId: 'emotions', imageUrl: '/images/emotions/jealous.png', example: 'I feel jealous of my friend\'s toy.' },
    { id: 'lonely', english: 'lonely', chinese: '孤独', phonetic: '/ˈloʊn.li/', themeId: 'emotions', imageUrl: '/images/emotions/lonely.png', example: 'I feel lonely when I am alone.' },
    { id: 'brave', english: 'brave', chinese: '勇敢', phonetic: '/breɪv/', themeId: 'emotions', imageUrl: '/images/emotions/brave.png', example: 'I am brave when I try new things.' },
    { id: 'embarrassed', english: 'embarrassed', chinese: '尴尬', phonetic: '/ɪmˈber.əst/', themeId: 'emotions', imageUrl: '/images/emotions/embarrassed.png', example: 'I feel embarrassed when I make a mistake.' },
    { id: 'grateful', english: 'grateful', chinese: '感激', phonetic: '/ˈɡreɪt.fəl/', themeId: 'emotions', imageUrl: '/images/emotions/grateful.png', example: 'I am grateful for my family.' },
    { id: 'disappointed', english: 'disappointed', chinese: '失望', phonetic: '/ˌdɪs.əˈpɔɪn.tɪd/', themeId: 'emotions', imageUrl: '/images/emotions/disappointed.png', example: 'I am disappointed when I lose.' },
    { id: 'relaxed', english: 'relaxed', chinese: '放松', phonetic: '/rɪˈlækst/', themeId: 'emotions', imageUrl: '/images/emotions/relaxed.png', example: 'I feel relaxed on vacation.' },

    // 蔬菜 (vegetables)
    { id: 'tomato', english: 'tomato', chinese: '番茄', phonetic: '/təˈmeɪ.toʊ/', themeId: 'vegetables', imageUrl: '/images/vegetables/tomato.png', example: 'The tomato is red.' },
    { id: 'carrot', english: 'carrot', chinese: '胡萝卜', phonetic: '/ˈkær.ət/', themeId: 'vegetables', imageUrl: '/images/vegetables/carrot.png', example: 'Rabbits like carrots.' },
    { id: 'potato', english: 'potato', chinese: '土豆', phonetic: '/pəˈteɪ.toʊ/', themeId: 'vegetables', imageUrl: '/images/vegetables/potato.png', example: 'We bake a potato.' },
    { id: 'onion', english: 'onion', chinese: '洋葱', phonetic: '/ˈʌn.jən/', themeId: 'vegetables', imageUrl: '/images/vegetables/onion.png', example: 'The onion makes me cry.' },
    { id: 'cabbage', english: 'cabbage', chinese: '卷心菜', phonetic: '/ˈkæb.ɪdʒ/', themeId: 'vegetables', imageUrl: '/images/vegetables/cabbage.png', example: 'Cabbage is green.' },
    { id: 'corn', english: 'corn', chinese: '玉米', phonetic: '/kɔːrn/', themeId: 'vegetables', imageUrl: '/images/vegetables/corn.png', example: 'Corn is yellow.' },
    { id: 'cucumber', english: 'cucumber', chinese: '黄瓜', phonetic: '/ˈkjuː.kʌm.bər/', themeId: 'vegetables', imageUrl: '/images/vegetables/cucumber.png', example: 'Cucumber is cool and fresh.' },
    { id: 'broccoli', english: 'broccoli', chinese: '西兰花', phonetic: '/ˈbrɑː.kəl.i/', themeId: 'vegetables', imageUrl: '/images/vegetables/broccoli.png', example: 'Broccoli looks like tiny trees.' },
    { id: 'lettuce', english: 'lettuce', chinese: '生菜', phonetic: '/ˈlet.ɪs/', themeId: 'vegetables', imageUrl: '/images/vegetables/lettuce.png', example: 'Lettuce is in my salad.' },
    { id: 'eggplant', english: 'eggplant', chinese: '茄子', phonetic: '/ˈeɡ.plænt/', themeId: 'vegetables', imageUrl: '/images/vegetables/eggplant.png', example: 'The eggplant is purple.' },
    { id: 'mushroom', english: 'mushroom', chinese: '蘑菇', phonetic: '/ˈmʌʃ.ruːm/', themeId: 'vegetables', imageUrl: '/images/vegetables/mushroom.png', example: 'The mushroom grows in the forest.' },
    { id: 'pea', english: 'pea', chinese: '豌豆', phonetic: '/piː/', themeId: 'vegetables', imageUrl: '/images/vegetables/pea.png', example: 'Peas are small and green.' },

    // 自然 (nature) — 与「天气」中的日月星云雨不重复 id
    { id: 'tree', english: 'tree', chinese: '树', phonetic: '/triː/', themeId: 'nature', imageUrl: '/images/nature/tree.png', example: 'The tree has green leaves.' },
    { id: 'flower', english: 'flower', chinese: '花', phonetic: '/ˈflaʊ.ər/', themeId: 'nature', imageUrl: '/images/nature/flower.png', example: 'The flower smells nice.' },
    { id: 'grass', english: 'grass', chinese: '草', phonetic: '/ɡræs/', themeId: 'nature', imageUrl: '/images/nature/grass.png', example: 'We sit on the grass.' },
    { id: 'river', english: 'river', chinese: '河流', phonetic: '/ˈrɪv.ər/', themeId: 'nature', imageUrl: '/images/nature/river.png', example: 'The river flows to the sea.' },
    { id: 'mountain', english: 'mountain', chinese: '山', phonetic: '/ˈmaʊn.tən/', themeId: 'nature', imageUrl: '/images/nature/mountain.png', example: 'The mountain is very tall.' },
    { id: 'leaf', english: 'leaf', chinese: '叶子', phonetic: '/liːf/', themeId: 'nature', imageUrl: '/images/nature/leaf.png', example: 'A leaf falls in autumn.' },
    { id: 'rock', english: 'rock', chinese: '石头', phonetic: '/rɑːk/', themeId: 'nature', imageUrl: '/images/nature/rock.png', example: 'I sit on a big rock.' },
    { id: 'forest', english: 'forest', chinese: '森林', phonetic: '/ˈfɔːr.ɪst/', themeId: 'nature', imageUrl: '/images/nature/forest.png', example: 'Many animals live in the forest.' },
    { id: 'lake', english: 'lake', chinese: '湖', phonetic: '/leɪk/', themeId: 'nature', imageUrl: '/images/nature/lake.png', example: 'We swim in the lake.' },
    { id: 'waterfall', english: 'waterfall', chinese: '瀑布', phonetic: '/ˈwɔː.tər.fɔːl/', themeId: 'nature', imageUrl: '/images/nature/waterfall.png', example: 'The waterfall is loud and beautiful.' },
    { id: 'bamboo', english: 'bamboo', chinese: '竹子', phonetic: '/bæmˈbuː/', themeId: 'nature', imageUrl: '/images/nature/bamboo.png', example: 'Pandas eat bamboo.' },
    { id: 'cactus', english: 'cactus', chinese: '仙人掌', phonetic: '/ˈkæk.təs/', themeId: 'nature', imageUrl: '/images/nature/cactus.png', example: 'A cactus grows in the desert.' },

    // 形状 (shapes)
    { id: 'circle', english: 'circle', chinese: '圆形', phonetic: '/ˈsɜːr.kəl/', themeId: 'shapes', imageUrl: '/images/shapes/circle.png', example: 'The ball is a circle.' },
    { id: 'square', english: 'square', chinese: '正方形', phonetic: '/skwer/', themeId: 'shapes', imageUrl: '/images/shapes/square.png', example: 'The window is a square.' },
    { id: 'triangle', english: 'triangle', chinese: '三角形', phonetic: '/ˈtraɪ.æŋ.ɡəl/', themeId: 'shapes', imageUrl: '/images/shapes/triangle.png', example: 'A slice of pizza is a triangle.' },
    { id: 'rectangle', english: 'rectangle', chinese: '长方形', phonetic: '/ˈrek.tæŋ.ɡəl/', themeId: 'shapes', imageUrl: '/images/shapes/rectangle.png', example: 'The door is a rectangle.' },
    { id: 'oval', english: 'oval', chinese: '椭圆形', phonetic: '/ˈoʊ.vəl/', themeId: 'shapes', imageUrl: '/images/shapes/oval.png', example: 'An egg looks like an oval.' },
    { id: 'shape-heart', english: 'heart', chinese: '心形', phonetic: '/hɑːrt/', themeId: 'shapes', imageUrl: '/images/shapes/shape-heart.png', example: 'I draw a red heart.' },
    { id: 'diamond', english: 'diamond', chinese: '菱形', phonetic: '/ˈdaɪ.mənd/', themeId: 'shapes', imageUrl: '/images/shapes/diamond.png', example: 'A kite can be a diamond.' },
    { id: 'star shape', english: 'star', chinese: '星形', phonetic: '/stɑːr/', themeId: 'shapes', imageUrl: '/images/shapes/star-shape.png', example: 'The sticker is a star.' },

    // 家居 (home)
    { id: 'bed', english: 'bed', chinese: '床', phonetic: '/bed/', themeId: 'home', imageUrl: '/images/home/bed.png', example: 'I sleep in my bed.' },
    { id: 'sofa', english: 'sofa', chinese: '沙发', phonetic: '/ˈsoʊ.fə/', themeId: 'home', imageUrl: '/images/home/sofa.png', example: 'We sit on the sofa.' },
    { id: 'table', english: 'table', chinese: '桌子', phonetic: '/ˈteɪ.bəl/', themeId: 'home', imageUrl: '/images/home/table.png', example: 'We eat at the table.' },
    { id: 'home-chair', english: 'chair', chinese: '椅子', phonetic: '/tʃer/', themeId: 'home', imageUrl: '/images/home/home-chair.png', example: 'I sit on a chair.' },
    { id: 'lamp', english: 'lamp', chinese: '台灯', phonetic: '/læmp/', themeId: 'home', imageUrl: '/images/home/lamp.png', example: 'The lamp gives light.' },
    { id: 'window', english: 'window', chinese: '窗户', phonetic: '/ˈwɪn.doʊ/', themeId: 'home', imageUrl: '/images/home/window.png', example: 'I look out the window.' },
    { id: 'door', english: 'door', chinese: '门', phonetic: '/dɔːr/', themeId: 'home', imageUrl: '/images/home/door.png', example: 'Please close the door.' },
    { id: 'mirror', english: 'mirror', chinese: '镜子', phonetic: '/ˈmɪr.ər/', themeId: 'home', imageUrl: '/images/home/mirror.png', example: 'I see myself in the mirror.' },
    { id: 'pillow', english: 'pillow', chinese: '枕头', phonetic: '/ˈpɪl.oʊ/', themeId: 'home', imageUrl: '/images/home/pillow.png', example: 'My pillow is soft.' },
    { id: 'blanket', english: 'blanket', chinese: '毯子', phonetic: '/ˈblæŋ.kɪt/', themeId: 'home', imageUrl: '/images/home/blanket.png', example: 'The blanket keeps me warm.' },
    { id: 'shelf', english: 'shelf', chinese: '架子', phonetic: '/ʃelf/', themeId: 'home', imageUrl: '/images/home/shelf.png', example: 'Books are on the shelf.' },
    { id: 'refrigerator', english: 'refrigerator', chinese: '冰箱', phonetic: '/rɪˈfrɪdʒ.ə.reɪ.tər/', themeId: 'home', imageUrl: '/images/home/refrigerator.png', example: 'Milk is in the refrigerator.' },

    // 职业 (jobs)
    { id: 'doctor', english: 'doctor', chinese: '医生', phonetic: '/ˈdɑːk.tər/', themeId: 'jobs', imageUrl: '/images/jobs/doctor.png', example: 'The doctor helps sick people.' },
    { id: 'dentist', english: 'dentist', chinese: '牙医', phonetic: '/ˈden.tɪst/', themeId: 'jobs', imageUrl: '/images/jobs/dentist.png', example: 'The dentist checks my teeth.' },
    { id: 'nurse', english: 'nurse', chinese: '护士', phonetic: '/nɜːrs/', themeId: 'jobs', imageUrl: '/images/jobs/nurse.png', example: 'The nurse is very kind.' },
    { id: 'farmer', english: 'farmer', chinese: '农民', phonetic: '/ˈfɑːr.mər/', themeId: 'jobs', imageUrl: '/images/jobs/farmer.png', example: 'The farmer grows food.' },
    { id: 'chef', english: 'chef', chinese: '厨师', phonetic: '/ʃef/', themeId: 'jobs', imageUrl: '/images/jobs/chef.png', example: 'The chef cooks good food.' },
    { id: 'driver', english: 'driver', chinese: '司机', phonetic: '/ˈdraɪ.vər/', themeId: 'jobs', imageUrl: '/images/jobs/driver.png', example: 'The driver drives the bus.' },
    { id: 'painter', english: 'painter', chinese: '画家', phonetic: '/ˈpeɪn.tər/', themeId: 'jobs', imageUrl: '/images/jobs/painter.png', example: 'The painter uses many colors.' },
    { id: 'musician', english: 'musician', chinese: '音乐家', phonetic: '/mjuːˈzɪʃ.ən/', themeId: 'jobs', imageUrl: '/images/jobs/musician.png', example: 'The musician plays the piano.' },
    { id: 'scientist', english: 'scientist', chinese: '科学家', phonetic: '/ˈsaɪ.ən.tɪst/', themeId: 'jobs', imageUrl: '/images/jobs/scientist.png', example: 'The scientist does experiments.' },
    { id: 'engineer', english: 'engineer', chinese: '工程师', phonetic: '/ˌen.dʒɪˈnɪr/', themeId: 'jobs', imageUrl: '/images/jobs/engineer.png', example: 'An engineer builds bridges.' },
    { id: 'firefighter', english: 'firefighter', chinese: '消防员', phonetic: '/ˈfaɪərˌfaɪ.tər/', themeId: 'jobs', imageUrl: '/images/jobs/firefighter.png', example: 'The firefighter puts out fires.' },

    // 运动 (sports)
    { id: 'soccer', english: 'soccer', chinese: '足球', phonetic: '/ˈsɑː.kər/', themeId: 'sports', imageUrl: '/images/sports/soccer.png', example: 'We play soccer at school.' },
    { id: 'basketball', english: 'basketball', chinese: '篮球', phonetic: '/ˈbæs.kɪt.bɔːl/', themeId: 'sports', imageUrl: '/images/sports/basketball.png', example: 'Basketball is fun to bounce.' },
    { id: 'tennis', english: 'tennis', chinese: '网球', phonetic: '/ˈten.ɪs/', themeId: 'sports', imageUrl: '/images/sports/tennis.png', example: 'We hit the ball in tennis.' },
    { id: 'swimming', english: 'swimming', chinese: '游泳', phonetic: '/ˈswɪm.ɪŋ/', themeId: 'sports', imageUrl: '/images/sports/swimming.png', example: 'Swimming is cool in summer.' },
    { id: 'running', english: 'running', chinese: '跑步', phonetic: '/ˈrʌn.ɪŋ/', themeId: 'sports', imageUrl: '/images/sports/running.png', example: 'Running makes me strong.' },
    { id: 'cycling', english: 'cycling', chinese: '骑自行车', phonetic: '/ˈsaɪ.klɪŋ/', themeId: 'sports', imageUrl: '/images/sports/cycling.png', example: 'Cycling is good exercise.' },
    { id: 'skating', english: 'skating', chinese: '滑冰', phonetic: '/ˈskeɪ.tɪŋ/', themeId: 'sports', imageUrl: '/images/sports/skating.png', example: 'I like skating on ice.' },
    { id: 'skiing', english: 'skiing', chinese: '滑雪', phonetic: '/ˈskiː.ɪŋ/', themeId: 'sports', imageUrl: '/images/sports/skiing.png', example: 'Skiing is fun in the snow.' },
    { id: 'baseball', english: 'baseball', chinese: '棒球', phonetic: '/ˈbeɪs.bɔːl/', themeId: 'sports', imageUrl: '/images/sports/baseball.png', example: 'We throw the baseball.' },
    { id: 'volleyball', english: 'volleyball', chinese: '排球', phonetic: '/ˈvɑː.li.bɔːl/', themeId: 'sports', imageUrl: '/images/sports/volleyball.png', example: 'We play volleyball in gym class.' },

    // 音乐 (music) — id 与 toys/school/actions 中已有词条区分
    { id: 'piano', english: 'piano', chinese: '钢琴', phonetic: '/piˈæn.oʊ/', themeId: 'music', imageUrl: '/images/music/piano.png', example: 'I practice the piano.' },
    { id: 'guitar', english: 'guitar', chinese: '吉他', phonetic: '/ɡɪˈtɑːr/', themeId: 'music', imageUrl: '/images/music/guitar.png', example: 'He plays the guitar.' },
    { id: 'xylophone', english: 'xylophone', chinese: '木琴', phonetic: '/ˈzaɪ.lə.foʊn/', themeId: 'music', imageUrl: '/images/music/xylophone.png', example: 'The xylophone has colorful bars.' },
    { id: 'violin', english: 'violin', chinese: '小提琴', phonetic: '/ˌvaɪ.əˈlɪn/', themeId: 'music', imageUrl: '/images/music/violin.png', example: 'The violin has four strings.' },
    { id: 'flute', english: 'flute', chinese: '长笛', phonetic: '/fluːt/', themeId: 'music', imageUrl: '/images/music/flute.png', example: 'She plays a silver flute.' },
    { id: 'trumpet', english: 'trumpet', chinese: '小号', phonetic: '/ˈtrʌm.pɪt/', themeId: 'music', imageUrl: '/images/music/trumpet.png', example: 'The trumpet sounds bright.' },
    { id: 'song', english: 'song', chinese: '歌曲', phonetic: '/sɔːŋ/', themeId: 'music', imageUrl: '/images/music/song.png', example: 'I learn a new song.' },
    { id: 'microphone', english: 'microphone', chinese: '麦克风', phonetic: '/ˈmaɪ.krə.foʊn/', themeId: 'music', imageUrl: '/images/music/microphone.png', example: 'I speak into the microphone.' },
    { id: 'ballet', english: 'ballet', chinese: '芭蕾舞', phonetic: '/bæˈleɪ/', themeId: 'music', imageUrl: '/images/music/ballet.png', example: 'Ballet dancers move gracefully.' },
    { id: 'melody', english: 'melody', chinese: '旋律', phonetic: '/ˈmel.ə.di/', themeId: 'music', imageUrl: '/images/music/melody.png', example: 'The melody is easy to remember.' },

    // 昆虫 (insects) — 与 animals 中常见虫类 id 不重复，侧重扩展词汇
    { id: 'wasp', english: 'wasp', chinese: '黄蜂', phonetic: '/wɑːsp/', themeId: 'insects', imageUrl: '/images/insects/wasp.png', example: 'A wasp can sting.' },
    { id: 'moth', english: 'moth', chinese: '飞蛾', phonetic: '/mɔːθ/', themeId: 'insects', imageUrl: '/images/insects/moth.png', example: 'A moth flies near the light.' },
    { id: 'firefly', english: 'firefly', chinese: '萤火虫', phonetic: '/ˈfaɪər.flaɪ/', themeId: 'insects', imageUrl: '/images/insects/firefly.png', example: 'Fireflies glow in the dark.' },
    { id: 'hornet', english: 'hornet', chinese: '大黄蜂', phonetic: '/ˈhɔːr.nɪt/', themeId: 'insects', imageUrl: '/images/insects/hornet.png', example: 'The hornet has yellow stripes.' },
    { id: 'cicada', english: 'cicada', chinese: '蝉', phonetic: '/sɪˈkeɪ.də/', themeId: 'insects', imageUrl: '/images/insects/cicada.png', example: 'Cicadas sing in summer.' },
    { id: 'termite', english: 'termite', chinese: '白蚁', phonetic: '/ˈtɜːr.maɪt/', themeId: 'insects', imageUrl: '/images/insects/termite.png', example: 'Termites eat wood.' },
    { id: 'locust', english: 'locust', chinese: '蝗虫', phonetic: '/ˈloʊ.kəst/', themeId: 'insects', imageUrl: '/images/insects/locust.png', example: 'Locusts can jump very far.' },
    { id: 'praying-mantis', english: 'praying mantis', chinese: '螳螂', phonetic: '/ˈmæn.tɪs/', themeId: 'insects', imageUrl: '/images/insects/praying-mantis.png', example: 'A praying mantis waits very still.' },
    { id: 'stick-insect', english: 'stick insect', chinese: '竹节虫', phonetic: '/ˈstɪk ˌɪn.sekt/', themeId: 'insects', imageUrl: '/images/insects/stick-insect.png', example: 'The stick insect looks like a twig.' },
    { id: 'earwig', english: 'earwig', chinese: '蠼螋', phonetic: '/ˈɪr.wɪɡ/', themeId: 'insects', imageUrl: '/images/insects/earwig.png', example: 'An earwig hides under leaves.' },

    // 饮料 (drinks) — 与 food 中 water/milk/juice 等 id 区分，专指常见饮品
    { id: 'tea', english: 'tea', chinese: '茶', phonetic: '/tiː/', themeId: 'drinks', imageUrl: '/images/drinks/tea.png', example: 'I drink warm tea.' },
    { id: 'coffee', english: 'coffee', chinese: '咖啡', phonetic: '/ˈkɔː.fi/', themeId: 'drinks', imageUrl: '/images/drinks/coffee.png', example: 'Coffee smells good.' },
    { id: 'soda', english: 'soda', chinese: '汽水', phonetic: '/ˈsoʊ.də/', themeId: 'drinks', imageUrl: '/images/drinks/soda.png', example: 'Soda has bubbles.' },
    { id: 'lemonade', english: 'lemonade', chinese: '柠檬水', phonetic: '/ˌlem.əˈneɪd/', themeId: 'drinks', imageUrl: '/images/drinks/lemonade.png', example: 'Lemonade is sweet and sour.' },
    { id: 'smoothie', english: 'smoothie', chinese: '奶昔果昔', phonetic: '/ˈsmuː.ði/', themeId: 'drinks', imageUrl: '/images/drinks/smoothie.png', example: 'I make a fruit smoothie.' },
    { id: 'hot-chocolate', english: 'hot chocolate', chinese: '热巧克力', phonetic: '/hɑːt ˈtʃɔːk.lət/', themeId: 'drinks', imageUrl: '/images/drinks/hot-chocolate.png', example: 'Hot chocolate is warm.' },
    { id: 'bubble-tea', english: 'bubble tea', chinese: '珍珠奶茶', phonetic: '/ˈbʌb.əl tiː/', themeId: 'drinks', imageUrl: '/images/drinks/bubble-tea.png', example: 'Bubble tea has chewy pearls.' },
    { id: 'sports-drink', english: 'sports drink', chinese: '运动饮料', phonetic: '/spɔːrts drɪŋk/', themeId: 'drinks', imageUrl: '/images/drinks/sports-drink.png', example: 'A sports drink helps after exercise.' },
    { id: 'milkshake', english: 'milkshake', chinese: '奶昔', phonetic: '/ˈmɪlk.ʃeɪk/', themeId: 'drinks', imageUrl: '/images/drinks/milkshake.png', example: 'A milkshake is cold and sweet.' },
    { id: 'green-tea', english: 'green tea', chinese: '绿茶', phonetic: '/ɡriːn tiː/', themeId: 'drinks', imageUrl: '/images/drinks/green-tea.png', example: 'Green tea is popular in Asia.' },
    { id: 'orange-juice-drink', english: 'orange juice', chinese: '橙汁', phonetic: '/ˈɔːr.ɪndʒ dʒuːs/', themeId: 'drinks', imageUrl: '/images/drinks/orange-juice.png', example: 'I drink orange juice at breakfast.' },
    { id: 'soy-milk', english: 'soy milk', chinese: '豆浆', phonetic: '/sɔɪ mɪlk/', themeId: 'drinks', imageUrl: '/images/drinks/soy-milk.png', example: 'Soy milk is made from soybeans.' },

    // 乐器 (instruments) — 与 music 主题中已有词条 id 不重复，侧重管弦与其它乐器
    { id: 'harp', english: 'harp', chinese: '竖琴', phonetic: '/hɑːrp/', themeId: 'instruments', imageUrl: '/images/instruments/harp.png', example: 'The harp has many strings.' },
    { id: 'cello', english: 'cello', chinese: '大提琴', phonetic: '/ˈtʃel.oʊ/', themeId: 'instruments', imageUrl: '/images/instruments/cello.png', example: 'The cello is large and deep.' },
    { id: 'saxophone', english: 'saxophone', chinese: '萨克斯', phonetic: '/ˈsæk.sə.foʊn/', themeId: 'instruments', imageUrl: '/images/instruments/saxophone.png', example: 'Jazz often uses a saxophone.' },
    { id: 'clarinet', english: 'clarinet', chinese: '单簧管', phonetic: '/ˌklær.əˈnet/', themeId: 'instruments', imageUrl: '/images/instruments/clarinet.png', example: 'The clarinet is black and shiny.' },
    { id: 'oboe', english: 'oboe', chinese: '双簧管', phonetic: '/ˈoʊ.boʊ/', themeId: 'instruments', imageUrl: '/images/instruments/oboe.png', example: 'The oboe has a clear sound.' },
    { id: 'double-bass', english: 'double bass', chinese: '低音提琴', phonetic: '/ˌdʌb.əl ˈbeɪs/', themeId: 'instruments', imageUrl: '/images/instruments/double-bass.png', example: 'The double bass is very big.' },
    { id: 'ukulele', english: 'ukulele', chinese: '尤克里里', phonetic: '/ˌjuː.kəˈleɪ.li/', themeId: 'instruments', imageUrl: '/images/instruments/ukulele.png', example: 'The ukulele is small and happy.' },
    { id: 'accordion', english: 'accordion', chinese: '手风琴', phonetic: '/əˈkɔːr.di.ən/', themeId: 'instruments', imageUrl: '/images/instruments/accordion.png', example: 'An accordion folds like a fan.' },
    { id: 'harmonica', english: 'harmonica', chinese: '口琴', phonetic: '/hɑːrˈmɑː.nɪ.kə/', themeId: 'instruments', imageUrl: '/images/instruments/harmonica.png', example: 'I blow into the harmonica.' },
    { id: 'tambourine', english: 'tambourine', chinese: '铃鼓', phonetic: '/ˌtæm.bəˈriːn/', themeId: 'instruments', imageUrl: '/images/instruments/tambourine.png', example: 'I shake the tambourine.' },
    { id: 'maracas', english: 'maracas', chinese: '沙锤', phonetic: '/məˈræ.kəz/', themeId: 'instruments', imageUrl: '/images/instruments/maracas.png', example: 'Maracas sound like rattles.' },
    { id: 'gong', english: 'gong', chinese: '锣', phonetic: '/ɡɔːŋ/', themeId: 'instruments', imageUrl: '/images/instruments/gong.png', example: 'The gong is loud and round.' },

    // 国家 (countries)
    { id: 'china', english: 'China', chinese: '中国', phonetic: '/ˈtʃaɪ.nə/', themeId: 'countries', imageUrl: '/images/countries/china.png', example: 'I live in China.' },
    { id: 'japan', english: 'Japan', chinese: '日本', phonetic: '/dʒəˈpæn/', themeId: 'countries', imageUrl: '/images/countries/japan.png', example: 'Japan has many mountains.' },
    { id: 'south-korea', english: 'South Korea', chinese: '韩国', phonetic: '/ˌsaʊθ kəˈriː.ə/', themeId: 'countries', imageUrl: '/images/countries/south-korea.png', example: 'South Korea is in Asia.' },
    { id: 'france', english: 'France', chinese: '法国', phonetic: '/fræns/', themeId: 'countries', imageUrl: '/images/countries/france.png', example: 'France is famous for bread.' },
    { id: 'germany', english: 'Germany', chinese: '德国', phonetic: '/ˈdʒɜːr.mə.ni/', themeId: 'countries', imageUrl: '/images/countries/germany.png', example: 'Germany has fast trains.' },
    { id: 'italy', english: 'Italy', chinese: '意大利', phonetic: '/ˈɪt.əl.i/', themeId: 'countries', imageUrl: '/images/countries/italy.png', example: 'Italy is shaped like a boot.' },
    { id: 'spain', english: 'Spain', chinese: '西班牙', phonetic: '/speɪn/', themeId: 'countries', imageUrl: '/images/countries/spain.png', example: 'Spain is sunny and warm.' },
    { id: 'uk', english: 'the UK', chinese: '英国', phonetic: '/ˌjuː ˈkeɪ/', themeId: 'countries', imageUrl: '/images/countries/uk.png', example: 'The UK has red buses.' },
    { id: 'usa', english: 'the USA', chinese: '美国', phonetic: '/ˌjuː es ˈeɪ/', themeId: 'countries', imageUrl: '/images/countries/usa.png', example: 'The USA is very big.' },
    { id: 'canada', english: 'Canada', chinese: '加拿大', phonetic: '/ˈkæn.ə.də/', themeId: 'countries', imageUrl: '/images/countries/canada.png', example: 'Canada is cold in winter.' },
    { id: 'australia', english: 'Australia', chinese: '澳大利亚', phonetic: '/ɔːˈstreɪ.li.ə/', themeId: 'countries', imageUrl: '/images/countries/australia.png', example: 'Australia has koalas.' },
    { id: 'brazil', english: 'Brazil', chinese: '巴西', phonetic: '/brəˈzɪl/', themeId: 'countries', imageUrl: '/images/countries/brazil.png', example: 'Brazil loves soccer.' },
    { id: 'india', english: 'India', chinese: '印度', phonetic: '/ˈɪn.di.ə/', themeId: 'countries', imageUrl: '/images/countries/india.png', example: 'India has colorful festivals.' },
    { id: 'mexico', english: 'Mexico', chinese: '墨西哥', phonetic: '/ˈmek.sɪ.koʊ/', themeId: 'countries', imageUrl: '/images/countries/mexico.png', example: 'Mexico is famous for tacos.' },
    { id: 'egypt', english: 'Egypt', chinese: '埃及', phonetic: '/ˈiː.dʒɪpt/', themeId: 'countries', imageUrl: '/images/countries/egypt.png', example: 'Egypt has pyramids.' },

    // 地点 (places)
    { id: 'place-hospital', english: 'hospital', chinese: '医院', phonetic: '/ˈhɑː.spɪ.təl/', themeId: 'places', imageUrl: '/images/places/hospital.png', example: 'We go to the hospital when we are sick.' },
    { id: 'place-supermarket', english: 'supermarket', chinese: '超市', phonetic: '/ˈsuː.pərˌmɑːr.kɪt/', themeId: 'places', imageUrl: '/images/places/supermarket.png', example: 'My mom buys food at the supermarket.' },
    { id: 'place-park', english: 'park', chinese: '公园', phonetic: '/pɑːrk/', themeId: 'places', imageUrl: '/images/places/park.png', example: 'We play in the park after school.' },
    { id: 'place-bank', english: 'bank', chinese: '银行', phonetic: '/bæŋk/', themeId: 'places', imageUrl: '/images/places/bank.png', example: 'My dad goes to the bank.' },
    { id: 'place-post-office', english: 'post office', chinese: '邮局', phonetic: '/poʊst ˈɔː.fɪs/', themeId: 'places', imageUrl: '/images/places/post-office.png', example: 'I send a letter at the post office.' },
    { id: 'place-restaurant', english: 'restaurant', chinese: '餐馆', phonetic: '/ˈres.tə.rɑːnt/', themeId: 'places', imageUrl: '/images/places/restaurant.png', example: 'We eat dinner at a restaurant.' },
    { id: 'place-pharmacy', english: 'pharmacy', chinese: '药店', phonetic: '/ˈfɑːr.mə.si/', themeId: 'places', imageUrl: '/images/places/pharmacy.png', example: 'We buy medicine at the pharmacy.' },
    { id: 'place-airport', english: 'airport', chinese: '机场', phonetic: '/ˈer.pɔːrt/', themeId: 'places', imageUrl: '/images/places/airport.png', example: 'The airplane leaves from the airport.' },
    { id: 'place-station', english: 'station', chinese: '车站', phonetic: '/ˈsteɪ.ʃən/', themeId: 'places', imageUrl: '/images/places/station.png', example: 'We wait for the train at the station.' },
    { id: 'place-museum', english: 'museum', chinese: '博物馆', phonetic: '/mjuːˈziː.əm/', themeId: 'places', imageUrl: '/images/places/museum.png', example: 'We see old things in the museum.' },
    { id: 'place-library', english: 'library', chinese: '图书馆', phonetic: '/ˈlaɪ.brer.i/', themeId: 'places', imageUrl: '/images/places/library.png', example: 'I read books in the library.' },
    { id: 'place-zoo', english: 'zoo', chinese: '动物园', phonetic: '/zuː/', themeId: 'places', imageUrl: '/images/places/zoo.png', example: 'We see lions at the zoo.' },

    // 感官 (senses)
    { id: 'sense-see', english: 'see', chinese: '看见', phonetic: '/siː/', themeId: 'senses', imageUrl: '/images/senses/see.png', example: 'I can see a bird.' },
    { id: 'sense-hear', english: 'hear', chinese: '听见', phonetic: '/hɪr/', themeId: 'senses', imageUrl: '/images/senses/hear.png', example: 'I can hear music.' },
    { id: 'sense-smell', english: 'smell', chinese: '闻', phonetic: '/smel/', themeId: 'senses', imageUrl: '/images/senses/smell.png', example: 'I smell flowers.' },
    { id: 'sense-taste', english: 'taste', chinese: '尝', phonetic: '/teɪst/', themeId: 'senses', imageUrl: '/images/senses/taste.png', example: 'I taste the soup.' },
    { id: 'sense-touch', english: 'touch', chinese: '触摸', phonetic: '/tʌtʃ/', themeId: 'senses', imageUrl: '/images/senses/touch.png', example: 'Please do not touch it.' },
    { id: 'sense-loud', english: 'loud', chinese: '大声的', phonetic: '/laʊd/', themeId: 'senses', imageUrl: '/images/senses/loud.png', example: 'The music is loud.' },
    { id: 'sense-quiet', english: 'quiet', chinese: '安静的', phonetic: '/ˈkwaɪ.ət/', themeId: 'senses', imageUrl: '/images/senses/quiet.png', example: 'The room is quiet.' },
    { id: 'sense-sweet', english: 'sweet', chinese: '甜的', phonetic: '/swiːt/', themeId: 'senses', imageUrl: '/images/senses/sweet.png', example: 'The candy is sweet.' },
    { id: 'sense-sour', english: 'sour', chinese: '酸的', phonetic: '/ˈsaʊ.ər/', themeId: 'senses', imageUrl: '/images/senses/sour.png', example: 'The lemon is sour.' },

    // 位置与方向 (positions)
    { id: 'pos-left', english: 'left', chinese: '左边', phonetic: '/left/', themeId: 'positions', imageUrl: '/images/positions/left.png', example: 'Turn left.' },
    { id: 'pos-right', english: 'right', chinese: '右边', phonetic: '/raɪt/', themeId: 'positions', imageUrl: '/images/positions/right.png', example: 'Turn right.' },
    { id: 'pos-up', english: 'up', chinese: '上', phonetic: '/ʌp/', themeId: 'positions', imageUrl: '/images/positions/up.png', example: 'Look up.' },
    { id: 'pos-down', english: 'down', chinese: '下', phonetic: '/daʊn/', themeId: 'positions', imageUrl: '/images/positions/down.png', example: 'Sit down.' },
    { id: 'pos-in', english: 'in', chinese: '在……里面', phonetic: '/ɪn/', themeId: 'positions', imageUrl: '/images/positions/in.png', example: 'The toy is in the box.' },
    { id: 'pos-on', english: 'on', chinese: '在……上面', phonetic: '/ɑːn/', themeId: 'positions', imageUrl: '/images/positions/on.png', example: 'The book is on the table.' },
    { id: 'pos-under', english: 'under', chinese: '在……下面', phonetic: '/ˈʌn.dər/', themeId: 'positions', imageUrl: '/images/positions/under.png', example: 'The cat is under the chair.' },
    { id: 'pos-over', english: 'over', chinese: '在……上方', phonetic: '/ˈoʊ.vɚ/', themeId: 'positions', imageUrl: '/images/positions/over.png', example: 'The plane flies over the city.' },
    { id: 'pos-between', english: 'between', chinese: '在……中间', phonetic: '/bɪˈtwiːn/', themeId: 'positions', imageUrl: '/images/positions/between.png', example: 'The ball is between the boxes.' },
    { id: 'pos-next-to', english: 'next to', chinese: '在……旁边', phonetic: '/nekst tuː/', themeId: 'positions', imageUrl: '/images/positions/next-to.png', example: 'Sit next to me.' },
    { id: 'pos-behind', english: 'behind', chinese: '在……后面', phonetic: '/bɪˈhaɪnd/', themeId: 'positions', imageUrl: '/images/positions/behind.png', example: 'The dog is behind the door.' },
    { id: 'pos-in-front-of', english: 'in front of', chinese: '在……前面', phonetic: '/ɪn frʌnt əv/', themeId: 'positions', imageUrl: '/images/positions/in-front-of.png', example: 'Stand in front of the line.' },

    // 对比概念 (opposites)
    { id: 'opp-big', english: 'big', chinese: '大的', phonetic: '/bɪɡ/', themeId: 'opposites', imageUrl: '/images/opposites/big.png', example: 'The elephant is big.' },
    { id: 'opp-small', english: 'small', chinese: '小的', phonetic: '/smɔːl/', themeId: 'opposites', imageUrl: '/images/opposites/small.png', example: 'The ant is small.' },
    { id: 'opp-tall', english: 'tall', chinese: '高的', phonetic: '/tɔːl/', themeId: 'opposites', imageUrl: '/images/opposites/tall.png', example: 'The tree is tall.' },
    { id: 'opp-short', english: 'short', chinese: '矮的 / 短的', phonetic: '/ʃɔːrt/', themeId: 'opposites', imageUrl: '/images/opposites/short.png', example: 'This pencil is short.' },
    { id: 'opp-long', english: 'long', chinese: '长的', phonetic: '/lɔːŋ/', themeId: 'opposites', imageUrl: '/images/opposites/long.png', example: 'The rope is long.' },
    { id: 'opp-heavy', english: 'heavy', chinese: '重的', phonetic: '/ˈhev.i/', themeId: 'opposites', imageUrl: '/images/opposites/heavy.png', example: 'This bag is heavy.' },
    { id: 'opp-light', english: 'light', chinese: '轻的', phonetic: '/laɪt/', themeId: 'opposites', imageUrl: '/images/opposites/light.png', example: 'This box is light.' },
    { id: 'opp-full', english: 'full', chinese: '满的', phonetic: '/fʊl/', themeId: 'opposites', imageUrl: '/images/opposites/full.png', example: 'The cup is full.' },
    { id: 'opp-empty', english: 'empty', chinese: '空的', phonetic: '/ˈemp.ti/', themeId: 'opposites', imageUrl: '/images/opposites/empty.png', example: 'The bottle is empty.' },
    { id: 'opp-open', english: 'open', chinese: '打开的', phonetic: '/ˈoʊ.pən/', themeId: 'opposites', imageUrl: '/images/opposites/open.png', example: 'The door is open.' },
    { id: 'opp-closed', english: 'closed', chinese: '关着的', phonetic: '/kloʊzd/', themeId: 'opposites', imageUrl: '/images/opposites/closed.png', example: 'The shop is closed.' },
    { id: 'opp-wet', english: 'wet', chinese: '湿的', phonetic: '/wet/', themeId: 'opposites', imageUrl: '/images/opposites/wet.png', example: 'My shoes are wet.' },
    { id: 'opp-dry', english: 'dry', chinese: '干的', phonetic: '/draɪ/', themeId: 'opposites', imageUrl: '/images/opposites/dry.png', example: 'My towel is dry.' },

    // 形容词入门 (adjectives)
    { id: 'adj-soft', english: 'soft', chinese: '柔软的', phonetic: '/sɔːft/', themeId: 'adjectives', imageUrl: '/images/adjectives/soft.png', example: 'The pillow is soft.' },
    { id: 'adj-hard', english: 'hard', chinese: '坚硬的', phonetic: '/hɑːrd/', themeId: 'adjectives', imageUrl: '/images/adjectives/hard.png', example: 'The rock is hard.' },
    { id: 'adj-smooth', english: 'smooth', chinese: '光滑的', phonetic: '/smuːð/', themeId: 'adjectives', imageUrl: '/images/adjectives/smooth.png', example: 'The table is smooth.' },
    { id: 'adj-rough', english: 'rough', chinese: '粗糙的', phonetic: '/rʌf/', themeId: 'adjectives', imageUrl: '/images/adjectives/rough.png', example: 'The tree bark is rough.' },
    { id: 'adj-clean', english: 'clean', chinese: '干净的', phonetic: '/kliːn/', themeId: 'adjectives', imageUrl: '/images/adjectives/clean.png', example: 'My hands are clean.' },
    { id: 'adj-dirty', english: 'dirty', chinese: '脏的', phonetic: '/ˈdɝː.ti/', themeId: 'adjectives', imageUrl: '/images/adjectives/dirty.png', example: 'My shoes are dirty.' },
    { id: 'adj-bright', english: 'bright', chinese: '明亮的', phonetic: '/braɪt/', themeId: 'adjectives', imageUrl: '/images/adjectives/bright.png', example: 'The sun is bright.' },
    { id: 'adj-dark', english: 'dark', chinese: '黑暗的', phonetic: '/dɑːrk/', themeId: 'adjectives', imageUrl: '/images/adjectives/dark.png', example: 'It is dark at night.' },
    { id: 'adj-same', english: 'same', chinese: '相同的', phonetic: '/seɪm/', themeId: 'adjectives', imageUrl: '/images/adjectives/same.png', example: 'We have the same bag.' },
    { id: 'adj-different', english: 'different', chinese: '不同的', phonetic: '/ˈdɪf.ər.ənt/', themeId: 'adjectives', imageUrl: '/images/adjectives/different.png', example: 'These shoes are different.' },

    // 安全规则 (safety)
    { id: 'safety-stop', english: 'stop', chinese: '停', phonetic: '/stɑːp/', themeId: 'safety', imageUrl: '/images/safety/stop.png', example: 'Stop and look.' },
    { id: 'safety-wait', english: 'wait', chinese: '等一等', phonetic: '/weɪt/', themeId: 'safety', imageUrl: '/images/safety/wait.png', example: 'Wait your turn.' },
    { id: 'safety-careful', english: 'careful', chinese: '小心', phonetic: '/ˈker.fəl/', themeId: 'safety', imageUrl: '/images/safety/careful.png', example: 'Be careful!' },
    { id: 'safety-danger', english: 'danger', chinese: '危险', phonetic: '/ˈdeɪn.dʒɚ/', themeId: 'safety', imageUrl: '/images/safety/danger.png', example: 'Danger! Do not touch.' },
    { id: 'safety-safe', english: 'safe', chinese: '安全的', phonetic: '/seɪf/', themeId: 'safety', imageUrl: '/images/safety/safe.png', example: 'This place is safe.' },
    { id: 'safety-help', english: 'help', chinese: '帮助', phonetic: '/help/', themeId: 'safety', imageUrl: '/images/safety/help.png', example: 'Help me, please.' },
    { id: 'safety-emergency', english: 'emergency', chinese: '紧急情况', phonetic: '/ɪˈmɝː.dʒən.si/', themeId: 'safety', imageUrl: '/images/safety/emergency.png', example: 'Call for help in an emergency.' },
    { id: 'safety-helmet', english: 'helmet', chinese: '头盔', phonetic: '/ˈhel.mɪt/', themeId: 'safety', imageUrl: '/images/safety/helmet.png', example: 'Wear a helmet.' },
    { id: 'safety-seat-belt', english: 'seat belt', chinese: '安全带', phonetic: '/siːt belt/', themeId: 'safety', imageUrl: '/images/safety/seat-belt.png', example: 'Buckle your seat belt.' },

    // 一日作息 (daily routine)
    { id: 'routine-wake-up', english: 'wake up', chinese: '起床', phonetic: '/weɪk ʌp/', themeId: 'daily', imageUrl: '/images/daily/wake-up.png', example: 'I wake up early.' },
    { id: 'routine-brush-teeth', english: 'brush teeth', chinese: '刷牙', phonetic: '/brʌʃ tiːθ/', themeId: 'daily', imageUrl: '/images/daily/brush-teeth.png', example: 'I brush my teeth.' },
    { id: 'routine-wash-hands', english: 'wash hands', chinese: '洗手', phonetic: '/wɑːʃ hændz/', themeId: 'daily', imageUrl: '/images/daily/wash-hands.png', example: 'Wash your hands, please.' },
    { id: 'routine-breakfast', english: 'breakfast', chinese: '早餐', phonetic: '/ˈbrek.fəst/', themeId: 'daily', imageUrl: '/images/daily/breakfast.png', example: 'I eat breakfast at home.' },
    { id: 'routine-go-to-school', english: 'go to school', chinese: '去上学', phonetic: '/ɡoʊ tuː skuːl/', themeId: 'daily', imageUrl: '/images/daily/go-to-school.png', example: 'I go to school on weekdays.' },
    { id: 'routine-homework', english: 'homework', chinese: '作业', phonetic: '/ˈhoʊm.wɜːrk/', themeId: 'daily', imageUrl: '/images/daily/homework.png', example: 'I do my homework.' },
    { id: 'routine-dinner', english: 'dinner', chinese: '晚餐', phonetic: '/ˈdɪn.ɚ/', themeId: 'daily', imageUrl: '/images/daily/dinner.png', example: 'We eat dinner together.' },
    { id: 'routine-shower', english: 'shower', chinese: '洗澡', phonetic: '/ˈʃaʊ.ɚ/', themeId: 'daily', imageUrl: '/images/daily/shower.png', example: 'I take a shower.' },
    { id: 'routine-bedtime', english: 'bedtime', chinese: '睡觉时间', phonetic: '/ˈbed.taɪm/', themeId: 'daily', imageUrl: '/images/daily/bedtime.png', example: 'It is bedtime.' },
    { id: 'routine-nap', english: 'nap', chinese: '午睡', phonetic: '/næp/', themeId: 'daily', imageUrl: '/images/daily/nap.png', example: 'I take a nap.' },

    // 礼貌用语 (polite words)
    { id: 'polite-please', english: 'please', chinese: '请', phonetic: '/pliːz/', themeId: 'polite', imageUrl: '/images/polite/please.png', example: 'Please sit down.' },
    { id: 'polite-thank-you', english: 'thank you', chinese: '谢谢', phonetic: '/θæŋk juː/', themeId: 'polite', imageUrl: '/images/polite/thank-you.png', example: 'Thank you!' },
    { id: 'polite-sorry', english: 'sorry', chinese: '对不起', phonetic: '/ˈsɑːr.i/', themeId: 'polite', imageUrl: '/images/polite/sorry.png', example: 'Sorry, I am late.' },
    { id: 'polite-excuse-me', english: 'excuse me', chinese: '打扰一下', phonetic: '/ɪkˈskjuːz miː/', themeId: 'polite', imageUrl: '/images/polite/excuse-me.png', example: 'Excuse me, please.' },
    { id: 'polite-hello', english: 'hello', chinese: '你好', phonetic: '/həˈloʊ/', themeId: 'polite', imageUrl: '/images/polite/hello.png', example: 'Hello!' },
    { id: 'polite-goodbye', english: 'goodbye', chinese: '再见', phonetic: '/ˌɡʊdˈbaɪ/', themeId: 'polite', imageUrl: '/images/polite/goodbye.png', example: 'Goodbye!' },
    { id: 'polite-good-morning', english: 'good morning', chinese: '早上好', phonetic: '/ɡʊd ˈmɔːr.nɪŋ/', themeId: 'polite', imageUrl: '/images/polite/good-morning.png', example: 'Good morning, teacher!' },
    { id: 'polite-good-night', english: 'good night', chinese: '晚安', phonetic: '/ɡʊd naɪt/', themeId: 'polite', imageUrl: '/images/polite/good-night.png', example: 'Good night, Mom.' },
    { id: 'polite-you-are-welcome', english: 'you are welcome', chinese: '不客气', phonetic: '/juː ɑːr ˈwel.kəm/', themeId: 'polite', imageUrl: '/images/polite/you-are-welcome.png', example: 'You are welcome.' },

    // 家务与整理 (chores)
    { id: 'chore-tidy-up', english: 'tidy up', chinese: '整理', phonetic: '/ˈtaɪ.di ʌp/', themeId: 'chores', imageUrl: '/images/chores/tidy-up.png', example: 'Let’s tidy up the room.' },
    { id: 'chore-clean', english: 'clean', chinese: '打扫', phonetic: '/kliːn/', themeId: 'chores', imageUrl: '/images/chores/clean.png', example: 'I clean the table.' },
    { id: 'chore-sweep', english: 'sweep', chinese: '扫地', phonetic: '/swiːp/', themeId: 'chores', imageUrl: '/images/chores/sweep.png', example: 'I sweep the floor.' },
    { id: 'chore-mop', english: 'mop', chinese: '拖地', phonetic: '/mɑːp/', themeId: 'chores', imageUrl: '/images/chores/mop.png', example: 'I mop the floor.' },
    { id: 'chore-wash-dishes', english: 'wash dishes', chinese: '洗碗', phonetic: '/wɑːʃ ˈdɪʃ.ɪz/', themeId: 'chores', imageUrl: '/images/chores/wash-dishes.png', example: 'I wash dishes after dinner.' },
    { id: 'chore-take-out-trash', english: 'take out the trash', chinese: '倒垃圾', phonetic: '/teɪk aʊt ðə træʃ/', themeId: 'chores', imageUrl: '/images/chores/take-out-trash.png', example: 'I take out the trash.' },
    { id: 'chore-make-bed', english: 'make the bed', chinese: '整理床铺', phonetic: '/meɪk ðə bed/', themeId: 'chores', imageUrl: '/images/chores/make-bed.png', example: 'I make the bed every morning.' },
    { id: 'chore-fold-clothes', english: 'fold clothes', chinese: '叠衣服', phonetic: '/foʊld kloʊðz/', themeId: 'chores', imageUrl: '/images/chores/fold-clothes.png', example: 'I fold my clothes.' },
    { id: 'chore-water-plants', english: 'water plants', chinese: '浇花', phonetic: '/ˈwɔː.t̬ɚ plænts/', themeId: 'chores', imageUrl: '/images/chores/water-plants.png', example: 'I water the plants.' },

    // 分类与配对 (sorting)
    { id: 'sort-same', english: 'same', chinese: '一样', phonetic: '/seɪm/', themeId: 'sorting', imageUrl: '/images/sorting/same.png', example: 'These two are the same.' },
    { id: 'sort-different', english: 'different', chinese: '不一样', phonetic: '/ˈdɪf.ər.ənt/', themeId: 'sorting', imageUrl: '/images/sorting/different.png', example: 'They are different.' },
    { id: 'sort-group', english: 'group', chinese: '分组', phonetic: '/ɡruːp/', themeId: 'sorting', imageUrl: '/images/sorting/group.png', example: 'Group the toys by color.' },
    { id: 'sort-sort', english: 'sort', chinese: '分类', phonetic: '/sɔːrt/', themeId: 'sorting', imageUrl: '/images/sorting/sort.png', example: 'Let’s sort the blocks.' },
    { id: 'sort-match', english: 'match', chinese: '配对', phonetic: '/mætʃ/', themeId: 'sorting', imageUrl: '/images/sorting/match.png', example: 'Match the socks.' },
    { id: 'sort-pair', english: 'pair', chinese: '一对', phonetic: '/per/', themeId: 'sorting', imageUrl: '/images/sorting/pair.png', example: 'I have a pair of shoes.' },

    // 时间概念 (time)
    { id: 'time-today', english: 'today', chinese: '今天', phonetic: '/təˈdeɪ/', themeId: 'time', imageUrl: '/images/time/today.png', example: 'Today is Monday.' },
    { id: 'time-tomorrow', english: 'tomorrow', chinese: '明天', phonetic: '/təˈmɑːr.oʊ/', themeId: 'time', imageUrl: '/images/time/tomorrow.png', example: 'Tomorrow is a new day.' },
    { id: 'time-yesterday', english: 'yesterday', chinese: '昨天', phonetic: '/ˈjes.tɚ.deɪ/', themeId: 'time', imageUrl: '/images/time/yesterday.png', example: 'Yesterday I played outside.' },
    { id: 'time-now', english: 'now', chinese: '现在', phonetic: '/naʊ/', themeId: 'time', imageUrl: '/images/time/now.png', example: 'Do it now.' },
    { id: 'time-later', english: 'later', chinese: '等会儿', phonetic: '/ˈleɪ.t̬ɚ/', themeId: 'time', imageUrl: '/images/time/later.png', example: 'See you later.' },
    { id: 'time-morning', english: 'morning', chinese: '早上', phonetic: '/ˈmɔːr.nɪŋ/', themeId: 'time', imageUrl: '/images/time/morning.png', example: 'I eat breakfast in the morning.' },
    { id: 'time-afternoon', english: 'afternoon', chinese: '下午', phonetic: '/ˌæf.tɚˈnuːn/', themeId: 'time', imageUrl: '/images/time/afternoon.png', example: 'We play in the afternoon.' },
    { id: 'time-evening', english: 'evening', chinese: '晚上', phonetic: '/ˈiːv.nɪŋ/', themeId: 'time', imageUrl: '/images/time/evening.png', example: 'I read in the evening.' },
    { id: 'time-night', english: 'night', chinese: '夜晚', phonetic: '/naɪt/', themeId: 'time', imageUrl: '/images/time/night.png', example: 'I sleep at night.' },
    { id: 'time-week', english: 'week', chinese: '星期', phonetic: '/wiːk/', themeId: 'time', imageUrl: '/images/time/week.png', example: 'A week has seven days.' },
    { id: 'time-month', english: 'month', chinese: '月份', phonetic: '/mʌnθ/', themeId: 'time', imageUrl: '/images/time/month.png', example: 'A month has many days.' },
    { id: 'time-year', english: 'year', chinese: '年', phonetic: '/jɪr/', themeId: 'time', imageUrl: '/images/time/year.png', example: 'A year has twelve months.' },

    // 数量概念 (math basics)
    { id: 'math-more', english: 'more', chinese: '更多', phonetic: '/mɔːr/', themeId: 'math', imageUrl: '/images/math/more.png', example: 'I want more water.' },
    { id: 'math-less', english: 'less', chinese: '更少', phonetic: '/les/', themeId: 'math', imageUrl: '/images/math/less.png', example: 'I have less time.' },
    { id: 'math-equal', english: 'equal', chinese: '相等', phonetic: '/ˈiː.kwəl/', themeId: 'math', imageUrl: '/images/math/equal.png', example: 'Two and two are equal to four.' },
    { id: 'math-add', english: 'add', chinese: '加', phonetic: '/æd/', themeId: 'math', imageUrl: '/images/math/add.png', example: 'Add one more.' },
    { id: 'math-subtract', english: 'subtract', chinese: '减', phonetic: '/səbˈtrækt/', themeId: 'math', imageUrl: '/images/math/subtract.png', example: 'Subtract one.' },
    { id: 'math-half', english: 'half', chinese: '一半', phonetic: '/hæf/', themeId: 'math', imageUrl: '/images/math/half.png', example: 'I eat half an apple.' },
    { id: 'math-whole', english: 'whole', chinese: '整体 / 全部', phonetic: '/hoʊl/', themeId: 'math', imageUrl: '/images/math/whole.png', example: 'I want the whole cookie.' },
    { id: 'math-count', english: 'count', chinese: '数数', phonetic: '/kaʊnt/', themeId: 'math', imageUrl: '/images/math/count.png', example: 'Let’s count to ten.' }
];

const themeMap = {
    fruits: '水果 (Fruits)',
    animals: '动物 (Animals)',
    colors: '颜色 (Colors)',
    numbers: '数字 (Numbers)',
    family: '家庭 (Family)',
    body: '身体 (Body)',
    food: '食物 (Food)',
    toys: '玩具 (Toys)',
    school: '学校 (School)',
    transportation: '交通工具 (Transportation)',
    weather: '天气 (Weather)',
    clothing: '服装 (Clothing)',
    actions: '动作 (Actions)',
    emotions: '情绪表达 (Emotions)',
    vegetables: '蔬菜 (Vegetables)',
    nature: '自然 (Nature)',
    shapes: '形状 (Shapes)',
    home: '家居 (Home)',
    jobs: '职业 (Jobs)',
    sports: '运动 (Sports)',
    music: '音乐 (Music)',
    insects: '昆虫 (Insects)',
    drinks: '饮料 (Drinks)',
    instruments: '乐器 (Instruments)',
    countries: '国家 (Countries)',
    places: '地点 (Places)',
    senses: '感官 (Senses)',
    positions: '位置与方向 (Positions)',
    opposites: '对比概念 (Opposites)',
    adjectives: '形容词入门 (Adjectives)',
    safety: '安全规则 (Safety)',
    daily: '一日作息 (Daily Routine)',
    polite: '礼貌用语 (Polite Words)',
    chores: '家务与整理 (Chores)',
    sorting: '分类与配对 (Sorting)',
    time: '时间概念 (Time)',
    math: '数量概念 (Math Basics)'
};

// 年龄档位词量控制（不改原始 vocabulary 数据）
const AGE_LEVEL = {
    PRESCHOOL: 'preschool',
    PRIMARY: 'primary'
};

// 小学版：保留常用词，覆盖面更广
const primaryWordAllowlistByTheme = {
    fruits: new Set([
        'apple', 'banana', 'orange', 'grape', 'strawberry', 'watermelon', 'pear', 'peach', 'cherry',
        'pineapple', 'mango', 'kiwi', 'lemon', 'lime', 'coconut', 'avocado', 'blueberry', 'blackberry',
        'raspberry', 'plum'
    ]),
    colors: new Set([
        'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white', 'gray',
        'silver', 'gold', 'beige', 'navy'
    ]),
    transportation: new Set([
        'car', 'bus', 'train', 'airplane', 'boat', 'ship', 'bicycle', 'motorcycle', 'scooter', 'taxi',
        'truck', 'subway', 'tram', 'helicopter', 'ambulance', 'fire truck', 'police car', 'crosswalk',
        'traffic-light', 'seat-belt', 'helmet', 'ticket'
    ]),
    weather: new Set([
        'sunny', 'cloudy', 'rainy', 'snowy', 'windy', 'foggy', 'stormy', 'hot', 'cold', 'warm', 'cool',
        'sun', 'moon', 'star', 'cloud', 'rain', 'snow', 'wind', 'lightning', 'thunder', 'rainbow',
        'umbrella', 'raincoat', 'weather', 'season', 'spring', 'summer', 'autumn', 'winter'
    ]),
    clothing: new Set([
        'shirt', 't-shirt', 'dress', 'skirt', 'pants', 'shorts', 'jeans', 'jacket', 'coat', 'sweater',
        'hoodie', 'socks', 'shoes', 'sneakers', 'boots', 'sandals', 'hat', 'cap', 'scarf', 'gloves',
        'pajamas', 'glasses', 'sunglasses', 'rain-boots', 'face-mask', 'windbreaker'
    ]),
    actions: new Set([
        'run', 'jump', 'eat', 'play', 'sing', 'dance', 'walk', 'swim', 'sleep', 'read', 'write', 'draw',
        'cook', 'drink', 'talk', 'listen', 'watch', 'smile', 'laugh', 'cry', 'sit', 'stand', 'open',
        'close', 'start', 'stop', 'wait', 'go', 'come', 'help', 'learn', 'teach'
    ])
};

// 幼儿版：只保留核心主题，且词更少更高频
const preschoolEnabledThemes = new Set([
    'fruits', 'animals', 'colors', 'numbers', 'family', 'body', 'food', 'toys',
    'school', 'transportation', 'weather', 'clothing', 'actions', 'home', 'shapes'
]);

const preschoolWordAllowlistByTheme = {
    fruits: new Set(['apple', 'banana', 'orange', 'grape', 'strawberry', 'watermelon', 'pear', 'peach', 'cherry', 'mango']),
    animals: new Set(['cat', 'dog', 'bird', 'fish', 'rabbit', 'horse', 'cow', 'pig', 'duck', 'chicken']),
    colors: new Set(['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white']),
    numbers: new Set(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']),
    family: new Set(['father', 'mother', 'brother', 'sister', 'grandfather', 'grandmother', 'baby', 'friend']),
    body: new Set(['head', 'eye', 'ear', 'nose', 'mouth', 'hand', 'foot', 'arm', 'leg', 'hair']),
    food: new Set(['rice', 'bread', 'egg', 'milk', 'water', 'juice', 'apple', 'banana', 'fish', 'chicken']),
    toys: new Set(['ball', 'doll', 'car', 'blocks', 'kite', 'puzzle', 'bicycle', 'robot']),
    school: new Set(['teacher', 'student', 'book', 'pen', 'pencil', 'notebook', 'classroom', 'school']),
    transportation: new Set(['car', 'bus', 'train', 'airplane', 'boat', 'bicycle', 'taxi', 'subway']),
    weather: new Set(['sunny', 'rainy', 'cloudy', 'snowy', 'hot', 'cold', 'sun', 'rain', 'wind']),
    clothing: new Set(['t-shirt', 'pants', 'dress', 'jacket', 'shoes', 'hat', 'socks', 'coat']),
    actions: new Set(['run', 'jump', 'eat', 'drink', 'sleep', 'read', 'write', 'play', 'walk', 'sing']),
    home: new Set(['bed', 'sofa', 'table', 'chair', 'door', 'window', 'lamp', 'mirror']),
    shapes: new Set(['circle', 'square', 'triangle', 'rectangle', 'oval', 'diamond'])
};

function isCommonWord(word, ageLevel = AGE_LEVEL.PRIMARY) {
    if (!word || !word.id || !word.themeId) return false;
    if (ageLevel === AGE_LEVEL.PRESCHOOL) {
        if (!preschoolEnabledThemes.has(word.themeId)) return false;
        const allowset = preschoolWordAllowlistByTheme[word.themeId];
        if (!allowset) return false;
        return allowset.has(word.id);
    }
    const allowset = primaryWordAllowlistByTheme[word.themeId];
    if (!allowset) return true; // 小学版：未限定主题默认保留
    return allowset.has(word.id);
}

function normalizeWordForDedup(text) {
    const raw = String(text || '').toLowerCase().trim();
    if (!raw) return '';
    let s = raw
        .replace(/^the\s+/, '')
        .replace(/['".,!?()]/g, '')
        .replace(/[-_/]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    // 简单单复数归一（避免 socks/sock 这类重复）
    if (s.endsWith('es') && s.length > 4) {
        s = s.slice(0, -2);
    } else if (s.endsWith('s') && !s.endsWith('ss') && s.length > 3) {
        s = s.slice(0, -1);
    }
    return s.replace(/\s+/g, '');
}

function dedupKeyForWord(word) {
    // 优先按英文词去重，若英文缺失再退化到 id
    const enKey = normalizeWordForDedup(word.english || word.en);
    if (enKey) return enKey;
    return normalizeWordForDedup(word.id);
}

const data = {};
for (const theme in themeMap) {
    data[themeMap[theme]] = [];
}

function rebuildLearningData(ageLevel = AGE_LEVEL.PRIMARY) {
    for (const key in data) data[key] = [];
    const seenByTheme = new Map(); // themeId -> Set(dedupKey)

    vocabulary.forEach(word => {
        if (!isCommonWord(word, ageLevel)) return;
        if (word && word.themeId && themeMap[word.themeId]) {
            const dedupKey = dedupKeyForWord(word);
            const seen = seenByTheme.get(word.themeId) || new Set();
            if (dedupKey && seen.has(dedupKey)) return;
            if (dedupKey) {
                seen.add(dedupKey);
                seenByTheme.set(word.themeId, seen);
            }

            const categoryName = themeMap[word.themeId];
            if (!data[categoryName]) data[categoryName] = [];
            data[categoryName].push({
                id: word.id,
                en: word.english,
                cn: word.chinese,
                phonetic: word.phonetic || '',
                example: word.example || '',
                imageUrl: word.imageUrl || ''
            });
        }
    });
}

const initialAgeLevel = localStorage.getItem('learning.ageLevel') || AGE_LEVEL.PRIMARY;
rebuildLearningData(initialAgeLevel);


// --- App State ---
const appState = window.AppStateModule
    ? window.AppStateModule.createAppState(Object.keys(data)[0], initialAgeLevel)
    : {
        currentCategory: Object.keys(data)[0],
        currentMode: 'flashcards',
        currentQuestion: null,
        isGameLoading: false,
        ageLevel: initialAgeLevel
    };
appState.useReviewWords = false;

// --- 配对连线状态 ---
const matchingState = window.AppStateModule
    ? window.AppStateModule.createMatchingState()
    : {
        words: [],
        images: [],
        connections: new Map(), // wordId -> imageId
        selectedWord: null,
        selectedImage: null,
        isCompleted: false,
        isProcessing: false // 防止快速连续点击
    };

// --- 听写训练状态 ---
const dictationState = window.AppStateModule
    ? window.AppStateModule.createDictationState()
    : {
        words: [],
        currentIndex: 0,
        currentWord: null,
        correctCount: 0,
        totalCount: 0,
        isCompleted: false,
        currentLetters: [], // 当前单词的字母数组
        shuffledLetters: [], // 打乱顺序的字母
        usedLetters: new Set(), // 已使用的字母索引
        currentAnswer: [] // 当前拼写的答案
    };

// --- DOM Elements ---
const categoryNav = document.getElementById('category-nav');
const flashcardContainer = document.getElementById('flashcard-container');
const gameContainer = document.getElementById('game-container');
const matchingContainer = document.getElementById('matching-container');
const dictationContainer = document.getElementById('dictation-container');
const modeFlashcardsBtn = document.getElementById('mode-flashcards');
const modeGameBtn = document.getElementById('mode-game');
const modeMatchingBtn = document.getElementById('mode-matching');
const modeDictationBtn = document.getElementById('mode-dictation');
const appSubtitle = document.getElementById('app-subtitle');
const gameQuestionWordEl = document.getElementById('game-question-word');
const gameChoicesGridEl = document.getElementById('game-choices-grid');
const menuToggle = document.getElementById('menu-toggle');
const menuBackdrop = document.getElementById('menu-backdrop');
const desktopSidebarToggle = document.getElementById('desktop-sidebar-toggle');
const sidebarToggle = document.getElementById('sidebar-toggle');
const mainScrollContainer = document.querySelector('.kid-content-wrap');
const funRandomCardBtn = document.getElementById('fun-random-card');
const funSoundTrainBtn = document.getElementById('fun-sound-train');
const funRandomChallengeBtn = document.getElementById('fun-random-challenge');
const funStreakChallengeBtn = document.getElementById('fun-streak-challenge');
const funFindWordBtn = document.getElementById('fun-find-word');
const funTimedGameBtn = document.getElementById('fun-timed-game');
const funPlayStatusEl = document.getElementById('fun-play-status');
const funMiniProgressEl = document.getElementById('fun-mini-progress');
const funBestStreakEl = document.getElementById('fun-best-streak');
const funTodayBestEl = document.getElementById('fun-today-best');
const funChallengeWinsEl = document.getElementById('fun-challenge-wins');
const funBadgesEl = document.getElementById('fun-badges');
const recordOverlayEl = document.getElementById('record-overlay');
const recordDescEl = document.getElementById('record-desc');
const recordCloseBtn = document.getElementById('record-close-btn');
const STREAK_BOARD_STORAGE_KEY = 'learning.streakBoard';
const streakBoard = {
    bestStreak: 0,
    todayBest: 0,
    challengeWins: 0,
    badges: [],
    dateKey: ''
};
const streakChallengeState = {
    active: false,
    target: 5,
    correct: 0
};
const renderState = {
    flashcardRenderToken: 0
};
const uiCache = {
    categoryButtonByName: new Map(),
    activeCategoryButton: null
};
const miniPlayState = {
    findWord: {
        active: false,
        targetWord: null,
        correct: 0,
        goal: 5
    },
    timedGame: {
        active: false,
        durationSec: 45,
        endAtMs: 0,
        total: 0,
        correct: 0,
        timerId: null
    }
};

// 配对连线相关元素
const matchingWordsEl = document.getElementById('matching-words');
const matchingImagesEl = document.getElementById('matching-images');
const matchingSvgEl = document.getElementById('matching-svg');
const matchingProgressEl = document.getElementById('matching-progress');
const matchingTotalEl = document.getElementById('matching-total');
const matchingCheckBtn = document.getElementById('matching-check');
const matchingResetBtn = document.getElementById('matching-reset');

// 听写训练相关元素
const dictationPlayBtn = document.getElementById('dictation-play');
const dictationWordDisplayEl = document.getElementById('dictation-word-display');
const dictationLetterCardsEl = document.getElementById('dictation-letter-cards');
const dictationSubmitBtn = document.getElementById('dictation-submit');
const dictationSkipBtn = document.getElementById('dictation-skip');
const dictationClearBtn = document.getElementById('dictation-clear');
const dictationFeedbackEl = document.getElementById('dictation-feedback');
const dictationProgressEl = document.getElementById('dictation-progress');
const dictationRemainingEl = document.getElementById('dictation-remaining');
const dictationFeedbackOverlayEl = document.getElementById('dictation-feedback-overlay');
const insightsStore = window.LearningInsightsModule
    ? window.LearningInsightsModule.createInsightsStore()
    : null;
const perfProfile = window.PerfProfileModule
    ? window.PerfProfileModule.detectProfile()
    : { reducedMotion: false, lowPower: false, confettiCount: 120, animationEnabled: true };
let dashboardPanelEl = null;

function clearMatchingItemSelection() {
    matchingContainer.querySelectorAll('.matching-item').forEach(el => el.classList.remove('selected'));
}

// --- Core Functions ---

// 已移除拖拽相关变量（不再支持长按拖拽排序）

// 图片URL处理函数 - 优先使用webp格式，回退到png
function getImageUrl(originalUrl) {
    if (!originalUrl) return '';
    
    // 如果已经是webp格式，直接返回
    if (originalUrl.endsWith('.webp')) {
        return originalUrl;
    }
    
    // 将.png替换为.webp
    if (originalUrl.endsWith('.png')) {
        return originalUrl.replace('.png', '.webp');
    }
    
    // 其他格式直接返回
    return originalUrl;
}

/**
 * 本地 webp/png 均缺失时的 AI 配图地址（Pollinations 公开接口，无需密钥，便于 GitHub Pages）。
 * 如需改用 MiniMax 等，可在页面中实现 window.buildCustomAiImageUrl(item) 返回完整图片 URL。
 */
function buildAiFallbackImageUrl(item) {
    if (typeof window.buildCustomAiImageUrl === 'function') {
        try {
            const custom = window.buildCustomAiImageUrl(item);
            if (custom) return custom;
        } catch (e) {
            console.warn('buildCustomAiImageUrl failed:', e);
        }
    }
    const en = (item.en || item.english || '').trim();
    const cn = (item.cn || item.chinese || '').trim();
    const prompt = encodeURIComponent(
        `Cute cartoon flashcard for children learning English, single clear subject: ${en}${cn ? '. Chinese meaning: ' + cn : ''}. Flat vector style, bright friendly colors, centered, plain white background, no text, no letters, no watermark`
    );
    return `https://image.pollinations.ai/prompt/${prompt}?width=512&height=512&nologo=true`;
}

/**
 * 图片加载链：webp → png → AI 生成 URL；全部失败则隐藏 img 并显示占位节点（img.nextElementSibling）。
 */
function bindWordImageFallback(img, item) {
    if (!img || !item) return;
    const webpUrl = getImageUrl(item.imageUrl);
    const pngUrl = item.imageUrl || '';
    const onLoad = () => {
        img.removeEventListener('error', onErr);
    };
    const onErr = () => {
        if (img.dataset.imgFallback === 'webp') {
            img.dataset.imgFallback = 'png';
            if (pngUrl) {
                img.src = pngUrl;
                return;
            }
            img.dataset.imgFallback = 'ai';
            img.src = buildAiFallbackImageUrl(item);
            return;
        }
        if (img.dataset.imgFallback === 'png') {
            img.dataset.imgFallback = 'ai';
            img.src = buildAiFallbackImageUrl(item);
            return;
        }
        img.removeEventListener('error', onErr);
        img.removeEventListener('load', onLoad);
        img.style.display = 'none';
        const ph = img.nextElementSibling;
        if (ph) ph.style.display = 'flex';
    };
    img.addEventListener('error', onErr);
    img.addEventListener('load', onLoad);
    if (webpUrl) {
        img.dataset.imgFallback = 'webp';
        img.src = webpUrl;
    } else if (pngUrl) {
        img.dataset.imgFallback = 'png';
        img.src = pngUrl;
    } else {
        img.dataset.imgFallback = 'ai';
        img.src = buildAiFallbackImageUrl(item);
    }
}


// 语音队列管理
const ttsState = window.AppStateModule
    ? window.AppStateModule.createTtsState()
    : {
        voicesLoaded: false,
        preferredVoice: null,
        warmedUp: false,
        settings: {
            speedPreset: localStorage.getItem('tts.speedPreset') || 'slow',
            voicePreference: localStorage.getItem('tts.voicePreference') || 'auto',
            voiceName: localStorage.getItem('tts.voiceName') || ''
        }
    };
// 儿童模式语音参数：整体再放慢一点，音高更接近自然说话
const CHILD_TTS = {
    rateScaleByPreset: {
        verySlow: 0.75,
        slow: 0.88,
        normal: 1.0
    },
    pitchDefault: 1.0,
    volumeDefault: 1.0
};

function getTtsRateScale() {
    return CHILD_TTS.rateScaleByPreset[ttsState.settings.speedPreset] || CHILD_TTS.rateScaleByPreset.slow;
}

function refreshTtsVoices() {
    if (window.TtsControllerModule) {
        window.TtsControllerModule.refreshTtsVoices(ttsState);
    }
}

function applyTtsSettings(partial = {}) {
    if (window.TtsControllerModule) {
        window.TtsControllerModule.applyTtsSettings(ttsState, partial, {
            onRefresh: refreshTtsVoices,
            onUpdateOptions: updateTtsVoiceOptions
        });
    }
}

function updateTtsVoiceOptions() {
    if (window.TtsControllerModule) {
        window.TtsControllerModule.updateTtsVoiceOptions(ttsState, {
            onInvalidVoiceFallback: () => applyTtsSettings({ voiceName: '' })
        });
    }
}

function initTtsControlsUI() {
    if (window.TtsControllerModule) {
        window.TtsControllerModule.initTtsControlsUI(appSubtitle, ttsState, {
            onApply: applyTtsSettings,
            onUpdateOptions: updateTtsVoiceOptions
        });
    }
}

function findFirstNonEmptyCategory() {
    const categories = Object.keys(data);
    const nonEmpty = categories.find(c => (data[c] || []).length > 0);
    return nonEmpty || categories[0];
}

function renderCategoryButtons() {
    const categories = Object.keys(data).filter(c => (data[c] || []).length > 0);
    categoryNav.replaceChildren();
    uiCache.categoryButtonByName.clear();
    uiCache.activeCategoryButton = null;

    const title = document.createElement('h2');
    title.className = 'px-2 text-2xl font-bold text-sky-600 mb-4';
    title.textContent = '主题分类';
    categoryNav.appendChild(title);

    // 分类按钮较多时，分批挂载可降低长任务阻塞
    let cursor = 0;
    const chunkSize = perfProfile.lowPower ? 12 : 24;
    const appendNextChunk = () => {
        const fragment = document.createDocumentFragment();
        const end = Math.min(cursor + chunkSize, categories.length);
        for (; cursor < end; cursor++) {
            const category = categories[cursor];
            const button = document.createElement('button');
            button.textContent = category;
            button.className = 'category-button w-full text-left px-4 py-3 text-lg font-semibold text-gray-700 rounded-lg transition-colors';
            button.addEventListener('click', () => selectCategory(category));
            uiCache.categoryButtonByName.set(category, button);
            fragment.appendChild(button);
        }
        categoryNav.appendChild(fragment);
        if (cursor < categories.length) {
            if (typeof window.requestIdleCallback === 'function') {
                window.requestIdleCallback(appendNextChunk, { timeout: 120 });
            } else {
                setTimeout(appendNextChunk, 0);
            }
        } else {
            const activeBtn = uiCache.categoryButtonByName.get(appState.currentCategory);
            if (activeBtn) {
                activeBtn.classList.add('active-category');
                uiCache.activeCategoryButton = activeBtn;
            }
        }
    };
    appendNextChunk();
}

function initAgeLevelControlsUI() {
    if (!appSubtitle || document.getElementById('age-level-controls')) return;
    const wrap = document.createElement('div');
    wrap.id = 'age-level-controls';
    wrap.className = 'mt-3 flex items-center justify-center gap-2';
    wrap.innerHTML = `
      <span class="text-sm text-gray-600 mr-1">词量档位</span>
      <button id="age-preschool-btn" class="px-3 py-1.5 rounded-full border text-sm font-semibold">幼儿版</button>
      <button id="age-primary-btn" class="px-3 py-1.5 rounded-full border text-sm font-semibold">小学版</button>
    `;
    appSubtitle.insertAdjacentElement('afterend', wrap);

    const preschoolBtn = document.getElementById('age-preschool-btn');
    const primaryBtn = document.getElementById('age-primary-btn');
    const syncBtnState = () => {
        const isPre = appState.ageLevel === AGE_LEVEL.PRESCHOOL;
        preschoolBtn.className = `px-3 py-1.5 rounded-full border text-sm font-semibold ${isPre ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'}`;
        primaryBtn.className = `px-3 py-1.5 rounded-full border text-sm font-semibold ${!isPre ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'}`;
    };

    preschoolBtn.addEventListener('click', async () => {
        if (appState.ageLevel === AGE_LEVEL.PRESCHOOL) return;
        appState.ageLevel = AGE_LEVEL.PRESCHOOL;
        localStorage.setItem('learning.ageLevel', appState.ageLevel);
        rebuildLearningData(appState.ageLevel);
        renderCategoryButtons();
        appState.currentCategory = findFirstNonEmptyCategory();
        syncBtnState();
        await selectCategory(appState.currentCategory);
    });
    primaryBtn.addEventListener('click', async () => {
        if (appState.ageLevel === AGE_LEVEL.PRIMARY) return;
        appState.ageLevel = AGE_LEVEL.PRIMARY;
        localStorage.setItem('learning.ageLevel', appState.ageLevel);
        rebuildLearningData(appState.ageLevel);
        renderCategoryButtons();
        appState.currentCategory = findFirstNonEmptyCategory();
        syncBtnState();
        await selectCategory(appState.currentCategory);
    });

    syncBtnState();
}

function updateDashboardPanel() {
    if (!dashboardPanelEl || !insightsStore) return;
    const dataBoard = insightsStore.getDashboard();
    if (!window.DashboardControllerModule) return;
    window.DashboardControllerModule.renderAndBind(dashboardPanelEl, dataBoard, {
        onReview: () => {
            appState.useReviewWords = true;
            setMode('dictation');
        },
        onClear: () => {
            const reviewWords = insightsStore.getReviewWords();
            reviewWords.forEach(word => insightsStore.clearReviewWord(word.id));
            updateDashboardPanel();
        }
    });
}

function initDashboardPanelUI() {
    if (!appSubtitle || dashboardPanelEl) return;
    dashboardPanelEl = document.createElement('div');
    dashboardPanelEl.id = 'learning-dashboard-panel';
    appSubtitle.insertAdjacentElement('afterend', dashboardPanelEl);
    updateDashboardPanel();
}

function recordLearningResult(item, isCorrect) {
    if (!insightsStore || !item) return;
    insightsStore.recordResult(item, isCorrect);
    if (isCorrect && item.id) {
        insightsStore.clearReviewWord(item.id);
    }
    updateDashboardPanel();
}

function warmupTtsEngine() {
    if (!('speechSynthesis' in window) || ttsState.warmedUp) return;
    try {
        // 触发部分浏览器的语音引擎初始化，避免首次点击无声
        window.speechSynthesis.getVoices();
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
    } catch (e) {
        console.log('TTS warmup skipped:', e);
    }
    ttsState.warmedUp = true;
}

function playFlashcardTapAnimation(card, evt = null) {
    if (!card) return;
    if (!perfProfile.animationEnabled) return;
    const effects = ['anim-card-bounce', 'anim-tap-tilt-left', 'anim-tap-tilt-right'];
    const cls = effects[Math.floor(Math.random() * effects.length)];
    card.classList.add(cls);
    setTimeout(() => card.classList.remove(cls), 820);
    card.classList.add('flashcard-glow-burst');
    setTimeout(() => card.classList.remove('flashcard-glow-burst'), 560);

    // 点击波纹（更有“按下反馈”）
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = `flashcard-ripple${Math.random() < 0.8 ? ' rainbow' : ''}`;
    const x = evt ? (evt.clientX - rect.left) : rect.width / 2;
    const y = evt ? (evt.clientY - rect.top) : rect.height / 2;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // 炫彩粒子（提升趣味）
    const stars = ['✨', '⭐', '💫', '🌟', '🎉', '🪄'];
    const particleCount = 6;
    for (let i = 0; i < particleCount; i++) {
        const star = document.createElement('span');
        star.className = 'flashcard-star';
        star.textContent = stars[Math.floor(Math.random() * stars.length)];
        const sx = Math.max(16, Math.min(rect.width - 16, x + (Math.random() * 26 - 13)));
        const sy = Math.max(16, Math.min(rect.height - 16, y + (Math.random() * 20 - 10)));
        star.style.left = `${sx}px`;
        star.style.top = `${sy}px`;
        star.style.color = `hsl(${Math.floor(Math.random() * 360)} 92% 62%)`;
        star.style.fontSize = `${14 + Math.floor(Math.random() * 8)}px`;
        star.style.setProperty('--dx', `${Math.round((Math.random() * 2 - 1) * 34)}px`);
        star.style.setProperty('--dy', `${Math.round(-28 - Math.random() * 22)}px`);
        card.appendChild(star);
        setTimeout(() => star.remove(), 760);
    }
}

if ('speechSynthesis' in window) {
    refreshTtsVoices();
    window.speechSynthesis.onvoiceschanged = () => {
        refreshTtsVoices();
        updateTtsVoiceOptions();
    };
    document.addEventListener('click', warmupTtsEngine, { once: true });
    document.addEventListener('touchstart', warmupTtsEngine, { once: true });
}

const speechQueue = window.SpeechQueueModule
    ? window.SpeechQueueModule.createSpeechQueue({
        onBeforeSpeak: refreshTtsVoices,
        getPreferredVoice: () => ttsState.preferredVoice,
        getRateScale: getTtsRateScale,
        getDefaultPitch: () => CHILD_TTS.pitchDefault,
        getDefaultVolume: () => CHILD_TTS.volumeDefault
    })
    : {
        add() {},
        clear() {}
    };

function speak(text, rate = 0.78, pitch = 1.0, volume = 1.0) {
    speechQueue.add(text, { rate, pitch, volume });
}

function speakWordAndExample(word, example, wordId = null) {
    // 播放点击音效
    playSound('click');
    
    // 记录学习进度
    if (wordId) {
        learningProgress.markWordLearned(wordId);
    }
    
    // 清空之前的语音队列
    speechQueue.clear();

    // 先阅读单词（更慢、更清晰，适合儿童）
    speak(word, 0.58, 1.0, 1.0);
    
    // 添加更长停顿后再读例句（更慢）
    setTimeout(() => {
        speak(example, 0.54, 1.0, 1.0);
    }, 2000);
}


// --- UI Rendering & Progressive Loading ---

function scheduleFlashcardChunkRender(task) {
    const runner = () => {
        if (task.token !== renderState.flashcardRenderToken) return;
        task.renderNextChunk();
    };
    if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(runner, { timeout: 120 });
    } else {
        setTimeout(runner, 0);
    }
}

function displayFlashcardsProgressively(category) {
    const words = data[category];
    if (!words || words.length === 0) {
        flashcardContainer.innerHTML = '<p class="text-center text-gray-500 p-8 col-span-full">该分类暂无单词数据</p>';
        return;
    }

    renderState.flashcardRenderToken += 1;
    const currentToken = renderState.flashcardRenderToken;
    flashcardContainer.innerHTML = '';
    const categorySlug = category.replace(/[^a-zA-Z0-9]/g, '');
    const validWords = words.filter((item) => item && item.en);
    const chunkSize = perfProfile.lowPower ? 8 : 16;
    let cursor = 0;

    const renderNextChunk = () => {
        if (currentToken !== renderState.flashcardRenderToken) return;
        const fragment = document.createDocumentFragment();
        const end = Math.min(cursor + chunkSize, validWords.length);
        for (; cursor < end; cursor++) {
            const item = validWords[cursor];
            const card = document.createElement('div');
            const cardId = `card-${categorySlug}-${item.en.replace(/[^a-zA-Z0-9]/g, '')}`;
            card.id = cardId;
            card.className = 'flashcard flex flex-col items-center justify-start rounded-2xl shadow-lg p-3 bg-white text-center';

            const safeAlt = String(item.en).replace(/"/g, '&quot;');
            card.innerHTML = `
                <div class="image-container">
                    <img alt="${safeAlt}" class="word-card-img w-full h-full object-contain" loading="lazy" decoding="async" />
                    <div class="flex items-center justify-center w-full h-full text-6xl bg-gray-100 rounded-lg" style="display:none;">📷</div>
                </div>
                <div class="flex flex-col flex-grow justify-between">
                    <div>
                        <p class="text-lg font-bold text-gray-800">${item.en}</p>
                        <p class="text-sm text-gray-500">${item.phonetic}</p>
                        <p class="text-md font-semibold text-sky-600 mt-1">${item.cn}</p>
                    </div>
                    <p class="text-xs text-gray-400 mt-2 italic text-center w-full example-text" style="cursor:pointer" title="点击朗读例句">"${item.example}"</p>
                </div>
            `;

            const wordCardImg = card.querySelector('.word-card-img');
            bindWordImageFallback(wordCardImg, item);

            card.addEventListener('click', (e) => {
                playFlashcardTapAnimation(card, e);
                playSound('click');
                speak(item.en, 0.58, 1.0, 1.0);

                if (miniPlayState.findWord.active && miniPlayState.findWord.targetWord) {
                    if (item.en === miniPlayState.findWord.targetWord.en) {
                        miniPlayState.findWord.correct += 1;
                        rewardSystem.giveStar();
                        if (miniPlayState.findWord.correct >= miniPlayState.findWord.goal) {
                            grantChallengeBonusStars(2);
                            showRecordModal(`找找看完成！你成功找到了 ${miniPlayState.findWord.goal} 个目标词，额外获得 ⭐ 2。`);
                            stopFindWord(`找找看完成！已获得基础星星 + 额外 ⭐ 2。`);
                        } else {
                            pickFindWordTarget();
                            setFunStatus('答对了！继续找下一个目标词。');
                            updateFindWordProgressText();
                        }
                    } else {
                        setFunStatus(`再试试：目标是 ${miniPlayState.findWord.targetWord.en}。`);
                        updateFindWordProgressText();
                    }
                }
            });

            const exampleEl = card.querySelector('.example-text');
            if (exampleEl) {
                exampleEl.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    playSound('click');
                    speechQueue.clear();
                    speak(item.example, 0.54, 1.0, 1.0);
                });
            }
            fragment.appendChild(card);
        }
        flashcardContainer.appendChild(fragment);

        if (cursor < validWords.length) {
            scheduleFlashcardChunkRender({ token: currentToken, renderNextChunk });
        }
    };

    scheduleFlashcardChunkRender({ token: currentToken, renderNextChunk });
}

// 已移除：拖拽功能相关变量和函数（长按拖拽排序已禁用）

function renderGameChoices(choices) {
    gameChoicesGridEl.innerHTML = '';
    const fragment = document.createDocumentFragment();

    choices.forEach((item, _index) => {
        const card = document.createElement('div');
        card.className = 'game-choice-card rounded-2xl shadow-lg p-2';

        const safeAlt = String(item.en).replace(/"/g, '&quot;');
        card.innerHTML = `<img alt="${safeAlt}" class="game-choice-img w-full h-full object-contain" loading="lazy" decoding="async" />
                              <div class="flex items-center justify-center w-full h-full text-6xl bg-gray-100 rounded-lg" style="display:none;">📷</div>`;

        const gameImg = card.querySelector('.game-choice-img');
        bindWordImageFallback(gameImg, item);

        card.addEventListener('click', () => handleChoiceClick(item, card));
        fragment.appendChild(card);
    });
    gameChoicesGridEl.appendChild(fragment);
}

// --- Game Logic ---

function generateQuestion() {
    const words = [...data[appState.currentCategory]];
    if (words.length < 4) {
        gameChoicesGridEl.innerHTML = '<p class="text-center col-span-full text-gray-500 p-8">这个类别单词太少，无法开始游戏哦！</p>';
        gameQuestionWordEl.textContent = '';
        if (streakChallengeState.active) {
            streakChallengeState.active = false;
            setFunStatus('连胜挑战已中断：当前主题题量不足。');
        }
        return;
    }

    // 显示加载状态
    appState.isGameLoading = true;
    gameChoicesGridEl.innerHTML = '<div class="col-span-full flex justify-center items-center p-8"><div class="loader"></div><div class="loader-text ml-2">准备题目中...</div></div>';

    // 延迟生成题目，让加载动画可见
    setTimeout(() => {
        for (let i = words.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [words[i], words[j]] = [words[j], words[i]]; 
        }
    const choices = words.slice(0, 4);
    appState.currentQuestion = choices[Math.floor(Math.random() * 4)];

    gameQuestionWordEl.textContent = appState.currentQuestion.en;
        // 清空语音队列，确保题目朗读清晰（放慢语速，适合儿童）
        speechQueue.clear();
        speak(appState.currentQuestion.en, 0.58, 1.0, 1.0);

    renderGameChoices(choices);
        appState.isGameLoading = false;
    }, 800);
}

function handleChoiceClick(selectedItem, cardElement) {
    if (appState.isGameLoading) return;
    if (miniPlayState.timedGame.active && Date.now() > miniPlayState.timedGame.endAtMs) {
        stopTimedGame('finished');
        return;
    }
    const isCorrect = selectedItem.en === appState.currentQuestion.en;
    
    // 记录答题结果
    learningProgress.recordAnswer(isCorrect);
    
    gameChoicesGridEl.style.pointerEvents = 'none';
    cardElement.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
        if (miniPlayState.timedGame.active) {
            miniPlayState.timedGame.total += 1;
            miniPlayState.timedGame.correct += 1;
        }
        if (streakChallengeState.active) {
            streakChallengeState.correct += 1;
            updateStreakBoardByProgress(streakChallengeState.correct);
            setFunStatus(`连胜挑战进行中：${streakChallengeState.correct}/${streakChallengeState.target}`);
        }
        recordLearningResult(selectedItem, true);
        // 播放正确音效
        playSound('correct');
        
        // 给予星星奖励
        rewardSystem.giveStar();
        // 彩带动画（答对时小朋友增强反馈）
        launchConfetti();
        
        // 先读单词和例句，然后读"Great!"
        speakWordAndExample(selectedItem.en, selectedItem.example, selectedItem.id);
        setTimeout(() => {
            speak('Great!', 0.78, 1.0, 1.0);
            playSound('success');
        }, 4500); // 放慢朗读后延长等待时间，避免重叠
        setTimeout(() => {
            if (streakChallengeState.active && streakChallengeState.correct >= streakChallengeState.target) {
                streakChallengeState.active = false;
                grantChallengeBonusStars(streakChallengeState.target);
                streakBoard.challengeWins += 1;
                if (streakBoard.challengeWins >= 3) ensureBadge('champion');
                saveStreakBoard();
                renderStreakBoard();
                launchConfetti();
                setFunStatus(`挑战成功！已连续答对 ${streakChallengeState.target} 题，额外奖励 ⭐ ${streakChallengeState.target}（双倍星星生效）。`);
                showRecordModal(`连胜挑战完成！本次额外获得 ⭐ ${streakChallengeState.target}，累计完成 ${streakBoard.challengeWins} 次。`);
                speak('Challenge complete!', 0.78, 1.0, 1.0);
            }
            generateQuestion();
            gameChoicesGridEl.style.pointerEvents = 'auto';
        }, 6000); // 总等待时间相应延长
    } else {
        if (miniPlayState.timedGame.active) {
            miniPlayState.timedGame.total += 1;
        }
        if (streakChallengeState.active) {
            streakChallengeState.active = false;
            streakChallengeState.correct = 0;
            setFunStatus(`挑战失败：本轮未连胜 ${streakChallengeState.target} 题。当前最高连胜 ${streakBoard.bestStreak}。点击“连胜挑战”可重新开始。`);
        }
        recordLearningResult(selectedItem, false);
        // 播放错误音效
        playSound('wrong');
        
        speak('Try again!', 0.84, 1.0, 1.0);
        setTimeout(() => {
            cardElement.classList.remove('incorrect');
            gameChoicesGridEl.style.pointerEvents = 'auto';
        }, 1200);
    }
}

// --- 配对连线功能 ---
function initMatchingGame(category) {
    const categoryWords = data[category] || [];
    if (categoryWords.length === 0) return;
    
    // 随机选择4个单词
    const shuffled = [...categoryWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffled.slice(0, Math.min(4, categoryWords.length));
    
    // 重置状态
    matchingState.words = selectedWords;
    matchingState.images = [...selectedWords].sort(() => Math.random() - 0.5);
    matchingState.connections.clear();
    matchingState.selectedWord = null;
    matchingState.selectedImage = null;
    matchingState.isCompleted = false;
    matchingState.isProcessing = false;
    
    renderMatchingItems();
    updateMatchingProgress();
    clearMatchingLines();
}

function renderMatchingItems() {
    // 渲染单词列表
    matchingWordsEl.innerHTML = '';
    const wordsFragment = document.createDocumentFragment();
    matchingState.words.forEach((word, _index) => {
        const wordEl = document.createElement('div');
        wordEl.className = 'matching-item';
        wordEl.dataset.wordId = word.id;
        wordEl.innerHTML = `<div class="matching-word">${word.en}</div>`;
        wordEl.addEventListener('click', () => selectMatchingWord(word.id, wordEl));
        wordsFragment.appendChild(wordEl);
        
    });
    matchingWordsEl.appendChild(wordsFragment);
    
    // 渲染图片列表
    matchingImagesEl.innerHTML = '';
    const imagesFragment = document.createDocumentFragment();
    matchingState.images.forEach((word, _index) => {
        const imageEl = document.createElement('div');
        imageEl.className = 'matching-item';
        imageEl.dataset.imageId = word.id;
        const wrap = document.createElement('div');
        wrap.className = 'relative w-full h-full flex items-center justify-center';
        const img = document.createElement('img');
        img.className = 'matching-image';
        img.alt = word.en || '';
        img.loading = 'lazy';
        img.decoding = 'async';
        const ph = document.createElement('div');
        ph.className = 'flex items-center justify-center w-full h-full min-h-[100px] text-5xl bg-gray-100 rounded-lg';
        ph.style.display = 'none';
        ph.textContent = '📷';
        wrap.appendChild(img);
        wrap.appendChild(ph);
        imageEl.appendChild(wrap);
        bindWordImageFallback(img, word);
        imageEl.addEventListener('click', () => selectMatchingImage(word.id, imageEl));
        imagesFragment.appendChild(imageEl);
        
    });
    matchingImagesEl.appendChild(imagesFragment);
}

function selectMatchingWord(wordId, element) {
    // 防止快速连续点击
    if (matchingState.isProcessing) return;
    
    // 检查是否已完成连接
    if (matchingState.connections.has(wordId)) {
        return; // 已连接的项目不可点击
    }
    
    // 播放点击音效
    playSound('click');
    
    // 清除之前的选择
    clearMatchingItemSelection();
    
    if (matchingState.selectedWord === wordId) {
        matchingState.selectedWord = null;
        return;
    }
    
    matchingState.selectedWord = wordId;
    element.classList.add('selected');
    
    // 如果已经选择了图片，尝试连接
    if (matchingState.selectedImage) {
        validateMatchingSelection();
    }
}

function selectMatchingImage(imageId, element) {
    // 防止快速连续点击
    if (matchingState.isProcessing) return;
    
    // 检查是否已被连接
    if (window.MatchingServiceModule
        && window.MatchingServiceModule.isImageUsed(matchingState.connections, imageId)) {
        return;
    }
    
    // 播放点击音效
    playSound('click');
    
    // 清除之前的选择
    clearMatchingItemSelection();
    
    if (matchingState.selectedImage === imageId) {
        matchingState.selectedImage = null;
        return;
    }
    
    matchingState.selectedImage = imageId;
    element.classList.add('selected');
    
    // 如果已经选择了单词，尝试连接
    if (matchingState.selectedWord) {
        validateMatchingSelection();
    }
}

function validateMatchingSelection() {
    if (!matchingState.selectedWord || !matchingState.selectedImage) return;
    
    // 防止重复处理
    if (matchingState.isProcessing) return;
    matchingState.isProcessing = true;
    
    const wordId = matchingState.selectedWord;
    const imageId = matchingState.selectedImage;
    
    const wordEl = matchingWordsEl.querySelector(`[data-word-id="${wordId}"]`);
    const imageEl = matchingImagesEl.querySelector(`[data-image-id="${imageId}"]`);
    
    const pairState = window.MatchingServiceModule
        ? window.MatchingServiceModule.canUsePair(matchingState.connections, wordId, imageId)
        : { canUse: !matchingState.connections.has(wordId), wordUsed: matchingState.connections.has(wordId), imageUsed: false };
    if (!pairState.canUse) {
        matchingState.selectedWord = null;
        matchingState.selectedImage = null;
        clearMatchingItemSelection();
        matchingState.isProcessing = false;
        return;
    }
    
    // 验证配对是否正确 - 通过比较单词的英文
    const isCorrect = window.MatchingServiceModule
        ? window.MatchingServiceModule.isCorrectPair(matchingState.words, matchingState.images, wordId, imageId)
        : false;
    
    if (isCorrect) {
        // 正确：创建连线、半透明禁用、不移除
        playSound('correct');

        // 记录连接
    matchingState.connections.set(wordId, imageId);

        // 视觉状态：正确+禁用
        if (wordEl) {
            wordEl.classList.add('correct', 'anim-flip');
            wordEl.style.opacity = '0.55';
            wordEl.style.pointerEvents = 'none';
        }
        if (imageEl) {
            imageEl.classList.add('correct', 'anim-flip');
            imageEl.style.opacity = '0.55';
            imageEl.style.pointerEvents = 'none';
        }

        // 清除选择高亮
    matchingState.selectedWord = null;
    matchingState.selectedImage = null;
    clearMatchingItemSelection();
    
        // 绘制连线与更新进度
    drawMatchingLines();
    updateMatchingProgress();
    
        // 判断是否全部完成
        const isDone = window.MatchingServiceModule
            ? window.MatchingServiceModule.isMatchingCompleted(matchingState.words, matchingState.connections)
            : false;
        if (isDone) {
            matchingState.isCompleted = true;
            playSound('success');
            if (typeof rewardSystem !== 'undefined') {
                rewardSystem.giveStar();
            }
            launchConfetti();
            setTimeout(() => {
                initMatchingGame(appState.currentCategory);
                matchingState.isProcessing = false;
            }, 1200);
        } else {
            // 重置处理状态
            setTimeout(() => {
                matchingState.isProcessing = false;
            }, 300);
        }
    } else {
        // 错误：红框抖动并取消选择
        playSound('wrong');
        if (wordEl) wordEl.classList.add('incorrect', 'anim-shake', 'anim-shuffle');
        if (imageEl) imageEl.classList.add('incorrect', 'anim-shake', 'anim-shuffle');
        
        setTimeout(() => {
            if (wordEl) wordEl.classList.remove('incorrect', 'selected', 'anim-shake', 'anim-shuffle');
            if (imageEl) imageEl.classList.remove('incorrect', 'selected', 'anim-shake', 'anim-shuffle');
            matchingState.selectedWord = null;
            matchingState.selectedImage = null;
            matchingState.isProcessing = false;
        }, 600);
    }
}

// --- 彩带动画 ---
function launchConfetti() {
    if (!perfProfile.animationEnabled || perfProfile.confettiCount <= 0) return;
    const colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];
    const count = perfProfile.confettiCount;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        const size = 6 + Math.random() * 8;
        piece.style.width = `${size}px`;
        piece.style.height = `${size * 1.2}px`;
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.opacity = '0.9';
        piece.style.setProperty('--dur', `${1.6 + Math.random() * 1.6}s`);
        piece.style.transform = `translateY(-100vh) rotate(${Math.random() * 360}deg)`;
        fragment.appendChild(piece);
    }
    const layer = document.createElement('div');
    layer.className = 'confetti-layer';
    layer.appendChild(fragment);
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 2700);
}

function drawMatchingLines() {
    matchingSvgEl.innerHTML = '';
    
    matchingState.connections.forEach((imageId, wordId) => {
        const wordEl = matchingWordsEl.querySelector(`[data-word-id="${wordId}"]`);
        const imageEl = matchingImagesEl.querySelector(`[data-image-id="${imageId}"]`);
        
        if (wordEl && imageEl) {
            const wordRect = wordEl.getBoundingClientRect();
            const imageRect = imageEl.getBoundingClientRect();
            const containerRect = matchingContainer.getBoundingClientRect();
            
            const startX = wordRect.right - containerRect.left;
            const startY = wordRect.top + wordRect.height / 2 - containerRect.top;
            const endX = imageRect.left - containerRect.left;
            const endY = imageRect.top + imageRect.height / 2 - containerRect.top;
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', startX);
            line.setAttribute('y1', startY);
            line.setAttribute('x2', endX);
            line.setAttribute('y2', endY);
            line.setAttribute('class', 'matching-line correct');
            line.dataset.wordId = wordId;
            line.dataset.imageId = imageId;
            
            // 添加动画效果
            line.style.opacity = '0';
            line.style.strokeDasharray = '10,5';
            line.style.strokeDashoffset = '15';
            
            matchingSvgEl.appendChild(line);
            
            // 动画显示连线（批量在下一帧执行，避免多次定时器）
            requestAnimationFrame(() => {
                line.style.transition = 'opacity 0.3s ease, stroke-dashoffset 0.5s ease';
                line.style.opacity = '1';
                line.style.strokeDashoffset = '0';
            });
        }
    });
}

function clearMatchingLines() {
    matchingSvgEl.innerHTML = '';
}

function updateMatchingProgress() {
    const total = Math.min(4, matchingState.words.length);
    const done = matchingState.connections ? matchingState.connections.size : 0;
    matchingProgressEl.textContent = done;
    matchingTotalEl.textContent = total;
}

function checkMatchingAnswers() {
    if (!matchingState.words || matchingState.words.length === 0) return;
    const checkState = window.ModeServicesModule
        ? window.ModeServicesModule.getMatchingCheckState(matchingState.words, matchingState.connections)
        : {
            total: Math.min(4, matchingState.words.length),
            done: matchingState.connections ? matchingState.connections.size : 0,
            isCompleted: matchingState.connections && matchingState.connections.size >= Math.min(4, matchingState.words.length)
        };

    // 当前版本为即时判定连接，检查按钮用于阶段反馈与快速下一题
    if (checkState.isCompleted) {
        playSound('success');
        launchConfetti();
        setTimeout(() => {
            initMatchingGame(appState.currentCategory);
        }, 900);
        return;
    }

    playSound('click');
    speak(`You have matched ${checkState.done} out of ${checkState.total}. Keep going!`, 0.72, 1.0, 1.0);
}

function resetMatchingGame() {
    initMatchingGame(appState.currentCategory);
}

// --- 听写训练功能 ---
function initDictationGame(category) {
    const reviewWords = insightsStore ? insightsStore.getReviewWords() : [];
    const pickResult = window.ModeServicesModule
        ? window.ModeServicesModule.pickDictationRoundWords({
            reviewWords,
            useReviewWords: appState.useReviewWords,
            categoryWords: data[category] || [],
            maxCount: 10
        })
        : { selectedWords: data[category] || [], usedReviewWords: false };
    const selectedWords = pickResult.selectedWords || [];
    if (selectedWords.length === 0) return;
    appState.useReviewWords = false;

    // 重置状态（由 service 生成回合基态）
    const roundState = window.DictationServiceModule
        ? window.DictationServiceModule.buildRoundState(selectedWords)
        : {
            words: selectedWords,
            currentIndex: 0,
            correctCount: 0,
            totalCount: selectedWords.length,
            isCompleted: false
        };
    dictationState.words = roundState.words;
    dictationState.currentIndex = roundState.currentIndex;
    dictationState.correctCount = roundState.correctCount;
    dictationState.totalCount = roundState.totalCount;
    dictationState.isCompleted = roundState.isCompleted;
    
    startDictationRound();
}

function startDictationRound() {
    const finishNow = window.DictationServiceModule
        ? window.DictationServiceModule.shouldFinish(dictationState.words, dictationState.currentIndex)
        : dictationState.currentIndex >= dictationState.words.length;
    if (finishNow) {
        finishDictationGame();
        return;
    }

    dictationState.currentWord = window.DictationServiceModule
        ? window.DictationServiceModule.getCurrentWord(dictationState.words, dictationState.currentIndex)
        : dictationState.words[dictationState.currentIndex];
    const questionState = window.DictationServiceModule
        ? window.DictationServiceModule.buildQuestionState(dictationState.currentWord)
        : {
            currentLetters: dictationState.currentWord.en.split(''),
            shuffledLetters: [],
            currentAnswer: []
        };
    dictationState.currentLetters = questionState.currentLetters;
    dictationState.shuffledLetters = questionState.shuffledLetters.length > 0
        ? questionState.shuffledLetters
        : [...dictationState.currentLetters].sort(() => Math.random() - 0.5);
    dictationState.usedLetters.clear();
    dictationState.currentAnswer = questionState.currentAnswer;
    
    renderLetterCards();
    renderWordDisplay();
    updateDictationDisplay();
    playDictationWord();
}

function renderLetterCards() {
    dictationLetterCardsEl.innerHTML = '';
    const fragment = document.createDocumentFragment();
    dictationState.shuffledLetters.forEach((letter, index) => {
        const card = document.createElement('div');
        card.className = 'letter-card';
        card.textContent = letter.toUpperCase();
        card.dataset.letterIndex = index;
        card.addEventListener('click', () => selectLetter(index, card));
        fragment.appendChild(card);
        
        // 听写训练不需要发牌动画，直接显示
    });
    dictationLetterCardsEl.appendChild(fragment);
}

function renderWordDisplay() {
    dictationWordDisplayEl.innerHTML = '';
    const fragment = document.createDocumentFragment();
    dictationState.currentLetters.forEach((letter, index) => {
        const letterEl = document.createElement('div');
        letterEl.className = 'word-letter';
        letterEl.dataset.position = index;
        letterEl.addEventListener('click', () => undoDictationAt(index));
        fragment.appendChild(letterEl);
        
        // 听写训练不需要发牌动画，直接显示
    });
    dictationWordDisplayEl.appendChild(fragment);
}

function selectLetter(letterIndex, cardElement) {
    if (!window.DictationInteractionModule) return;
    window.DictationInteractionModule.selectLetter({
        letterIndex,
        cardElement,
        state: dictationState,
        dictationWordDisplayEl,
        onPlayClick: () => playSound('click'),
        onSubmit: submitDictationAnswer
    });
}

function undoDictationAt(position) {
    if (!window.DictationInteractionModule) return;
    window.DictationInteractionModule.undoAt({
        position,
        state: dictationState,
        dictationLetterCardsEl,
        dictationWordDisplayEl,
        onPlayClick: () => playSound('click')
    });
}

function clearDictationAnswer() {
    dictationState.currentAnswer = [];
    dictationState.usedLetters.clear();
    
    // 重置字母卡片
    dictationLetterCardsEl.querySelectorAll('.letter-card').forEach(card => {
        card.classList.remove('used');
    });
    
    // 重置单词显示
    dictationWordDisplayEl.querySelectorAll('.word-letter').forEach(letterEl => {
        letterEl.textContent = '';
        letterEl.style.background = '';
        letterEl.style.borderColor = '';
    });
    
    playSound('click');
}

function playDictationWord() {
    if (dictationState.currentWord) {
        // 清空语音队列，确保听写单词朗读清晰（放慢语速）
        speechQueue.clear();
        speak(dictationState.currentWord.en, 0.58, 1.0, 1.0);
    }
}

function updateDictationDisplay() {
    dictationRemainingEl.textContent = dictationState.words.length - dictationState.currentIndex;
    dictationProgressEl.textContent = `正确: ${dictationState.correctCount}/${dictationState.currentIndex}`;
    dictationFeedbackEl.innerHTML = '';
}

function submitDictationAnswer() {
    const result = window.DictationServiceModule
        ? window.DictationServiceModule.evaluateAnswer(dictationState.currentAnswer, dictationState.currentWord)
        : { isCorrect: false, correctAnswer: (dictationState.currentWord?.en || '') };
    const isCorrect = result.isCorrect;
    
    if (isCorrect) {
        recordLearningResult(dictationState.currentWord, true);
        dictationState.correctCount++;
        playSound('correct');
        showDictationFeedback('correct', '正确！', `正确答案: ${result.correctAnswer}`);
        
        // 显示正确答案的绿色效果
        dictationWordDisplayEl.querySelectorAll('.word-letter').forEach(letterEl => {
            letterEl.style.background = '#dcfce7';
            letterEl.style.borderColor = '#22c55e';
            letterEl.classList.add('anim-pop-in');
            setTimeout(() => letterEl.classList.remove('anim-pop-in'), 250);
        });
        // 答对一题也放彩带，增强正反馈
        launchConfetti();
        
        // 播放鼓励语音
        setTimeout(() => {
            speak('Excellent!', 0.82, 1.0, 1.0);
        }, 500);
    } else {
        recordLearningResult(dictationState.currentWord, false);
        playSound('wrong');
        showDictationFeedback('incorrect', '不正确', `正确答案: ${result.correctAnswer}`);
        
        // 显示错误答案的红色效果
        dictationWordDisplayEl.querySelectorAll('.word-letter').forEach(letterEl => {
            letterEl.style.background = '#fef2f2';
            letterEl.style.borderColor = '#ef4444';
            letterEl.classList.add('anim-shake');
            setTimeout(() => letterEl.classList.remove('anim-shake'), 500);
        });
        
        // 播放鼓励语音
        setTimeout(() => {
            speak('Keep trying!', 0.78, 1.0, 1.0);
        }, 500);
        
        // 3秒后自动关闭反馈
        setTimeout(() => {
            hideDictationFeedback();
        }, 3000);
    }
    
    learningProgress.recordAnswer(isCorrect);
    
    // 延迟后进入下一题
    setTimeout(() => {
        dictationState.currentIndex++;
        startDictationRound();
    }, 2000);
}

function skipDictationQuestion() {
    showDictationFeedback('show-answer', '跳过', `正确答案: ${dictationState.currentWord.en}`);
    
    // 显示正确答案
    dictationState.currentLetters.forEach((letter, index) => {
        const letterEl = dictationWordDisplayEl.querySelector(`[data-position="${index}"]`);
        if (letterEl) {
            letterEl.textContent = letter.toUpperCase();
            letterEl.style.background = '#eff6ff';
            letterEl.style.borderColor = '#3b82f6';
        }
    });
    
    setTimeout(() => {
        dictationState.currentIndex++;
        startDictationRound();
    }, 2000);
}

function showDictationFeedback(type, title, message) {
    dictationFeedbackEl.innerHTML = `
        <div class="dictation-feedback ${type}">
            <div class="font-bold text-xl">${title}</div>
            <div class="text-lg mt-2">${message}</div>
        </div>
    `;
    dictationFeedbackOverlayEl.classList.remove('hidden');
}

function hideDictationFeedback() {
    dictationFeedbackOverlayEl.classList.add('hidden');
}

function finishDictationGame() {
    dictationState.isCompleted = true;
    const accuracy = Math.round((dictationState.correctCount / dictationState.totalCount) * 100);
    
    dictationFeedbackEl.innerHTML = `
        <div class="dictation-feedback ${accuracy >= 80 ? 'correct' : 'incorrect'}">
            <div class="font-bold text-2xl">听写完成！</div>
            <div class="text-xl mt-3">正确率: ${accuracy}% (${dictationState.correctCount}/${dictationState.totalCount})</div>
            <div class="mt-4">
                <button onclick="initDictationGame('${appState.currentCategory}'); hideDictationFeedback();" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg font-semibold mr-3">
                再来一次
            </button>
                <button onclick="hideDictationFeedback();" class="px-6 py-3 bg-gradient-to-r from-gray-500 to-slate-500 text-white rounded-full hover:from-gray-600 hover:to-slate-600 transition-all shadow-lg font-semibold">
                    关闭
            </button>
            </div>
        </div>
    `;
    dictationFeedbackOverlayEl.classList.remove('hidden');
    
    if (accuracy >= 80) {
        rewardSystem.giveStar();
        // 结算达标时再放一次彩带
        launchConfetti();
    }
}

// --- Mode & Category & Menu Management ---

function updateActiveUI() {
    modeFlashcardsBtn.classList.toggle('active', appState.currentMode === 'flashcards');
    modeGameBtn.classList.toggle('active', appState.currentMode === 'game');
    modeMatchingBtn.classList.toggle('active', appState.currentMode === 'matching');
    modeDictationBtn.classList.toggle('active', appState.currentMode === 'dictation');
    const nextActive = uiCache.categoryButtonByName.get(appState.currentCategory) || null;
    if (uiCache.activeCategoryButton && uiCache.activeCategoryButton !== nextActive) {
        uiCache.activeCategoryButton.classList.remove('active-category');
    }
    if (nextActive && nextActive !== uiCache.activeCategoryButton) {
        nextActive.classList.add('active-category');
    }
    uiCache.activeCategoryButton = nextActive;
    
    const subtitles = {
        'flashcards': '🌟 点击卡片学习单词，听发音和看例句！',
        'game': '🎵 听声音，选择正确的图片！',
        'matching': '🔗 将左侧的单词与右侧对应的图片连线',
        'dictation': '✏️ 听声音，用字母卡片拼出单词'
    };
    appSubtitle.textContent = subtitles[appState.currentMode] || '选择类别开始学习！';
}

async function setMode(mode) {
    if (mode !== 'flashcards' && miniPlayState.findWord.active) {
        stopFindWord('你已离开卡片认读模式，“找找看”已结束。');
    }
    if (mode !== 'game' && miniPlayState.timedGame.active) {
        stopTimedGame('你已离开看词选图模式，限时闯关已结束。');
    }
    if (mode !== 'game' && streakChallengeState.active) {
        streakChallengeState.active = false;
        streakChallengeState.correct = 0;
        setFunStatus('你已离开看词选图模式，连胜挑战已结束。');
    }
    appState.currentMode = mode;
    flashcardContainer.classList.toggle('hidden', mode !== 'flashcards');
    gameContainer.classList.toggle('hidden', mode !== 'game');
    matchingContainer.classList.toggle('hidden', mode !== 'matching');
    dictationContainer.classList.toggle('hidden', mode !== 'dictation');
    
    // 滚动到学习视口顶部（避免触发布局抖动）
    scrollLearningViewportTop('smooth');
    
    await selectCategory(appState.currentCategory);
}

async function selectCategory(category) {
    appState.currentCategory = category;
    updateActiveUI();

    if (appState.currentMode === 'flashcards') {
        displayFlashcardsProgressively(category);
    } else if (appState.currentMode === 'game') {
        generateQuestion();
    } else if (appState.currentMode === 'matching') {
        initMatchingGame(category);
    } else if (appState.currentMode === 'dictation') {
        initDictationGame(category);
    }

    // 滚动到学习视口顶部（避免触发布局抖动）
    scrollLearningViewportTop('smooth');

    if (window.innerWidth < 768) {
        toggleMenu();
    }
}

function toggleMenu() {
    categoryNav.classList.toggle('-translate-x-full');
    menuBackdrop.classList.toggle('hidden');
}

function toggleDesktopSidebar() {
    document.body.classList.toggle('sidebar-hidden');
}

function scrollLearningViewportTop(behavior = 'smooth') {
    if (mainScrollContainer && typeof mainScrollContainer.scrollTo === 'function') {
        mainScrollContainer.scrollTo({ top: 0, behavior });
        return;
    }
    window.scrollTo({ top: 0, behavior });
}

function setFunStatus(message) {
    if (!funPlayStatusEl) return;
    funPlayStatusEl.textContent = message;
}

function setMiniProgress(message) {
    if (!funMiniProgressEl) return;
    funMiniProgressEl.textContent = message;
}

function getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function saveStreakBoard() {
    try {
        localStorage.setItem(STREAK_BOARD_STORAGE_KEY, JSON.stringify(streakBoard));
    } catch (error) {
        console.warn('saveStreakBoard failed:', error);
    }
}

function renderStreakBadges() {
    if (!funBadgesEl) return;
    const badgeLabels = {
        streak3: '🥉 连胜3题',
        streak5: '🥈 连胜5题',
        streak10: '🥇 连胜10题',
        champion: '👑 闯关达人'
    };
    const badgeIds = Array.isArray(streakBoard.badges) ? streakBoard.badges : [];
    if (badgeIds.length === 0) {
        funBadgesEl.innerHTML = '<span class="fun-badge">暂无勋章，开始挑战吧！</span>';
        return;
    }
    funBadgesEl.innerHTML = badgeIds
        .map((id) => `<span class="fun-badge">${badgeLabels[id] || id}</span>`)
        .join('');
}

function renderStreakBoard() {
    if (funBestStreakEl) funBestStreakEl.textContent = String(streakBoard.bestStreak || 0);
    if (funTodayBestEl) funTodayBestEl.textContent = String(streakBoard.todayBest || 0);
    if (funChallengeWinsEl) funChallengeWinsEl.textContent = String(streakBoard.challengeWins || 0);
    renderStreakBadges();
}

function ensureBadge(id) {
    if (!id) return;
    if (!Array.isArray(streakBoard.badges)) streakBoard.badges = [];
    if (!streakBoard.badges.includes(id)) {
        streakBoard.badges.push(id);
    }
}

function showRecordModal(message) {
    if (!recordOverlayEl || !recordDescEl) return;
    recordDescEl.textContent = message;
    recordOverlayEl.classList.add('show');
}

function hideRecordModal() {
    if (!recordOverlayEl) return;
    recordOverlayEl.classList.remove('show');
}

function loadStreakBoard() {
    const todayKey = getTodayKey();
    try {
        const raw = localStorage.getItem(STREAK_BOARD_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            streakBoard.bestStreak = Math.max(0, Number(parsed.bestStreak) || 0);
            streakBoard.todayBest = Math.max(0, Number(parsed.todayBest) || 0);
            streakBoard.challengeWins = Math.max(0, Number(parsed.challengeWins) || 0);
            streakBoard.badges = Array.isArray(parsed.badges) ? parsed.badges : [];
            streakBoard.dateKey = String(parsed.dateKey || '');
        }
    } catch (error) {
        console.warn('loadStreakBoard failed:', error);
    }
    if (streakBoard.dateKey !== todayKey) {
        streakBoard.todayBest = 0;
        streakBoard.dateKey = todayKey;
        saveStreakBoard();
    }
    renderStreakBoard();
}

function updateStreakBoardByProgress(currentStreak) {
    const streak = Math.max(0, Number(currentStreak) || 0);
    let hasRecordBreak = false;
    if (streak > streakBoard.bestStreak) {
        streakBoard.bestStreak = streak;
        hasRecordBreak = true;
    }
    if (streak > streakBoard.todayBest) {
        streakBoard.todayBest = streak;
    }
    if (streak >= 3) ensureBadge('streak3');
    if (streak >= 5) ensureBadge('streak5');
    if (streak >= 10) ensureBadge('streak10');
    saveStreakBoard();
    renderStreakBoard();
    if (hasRecordBreak) {
        showRecordModal(`新的最高连胜：${streak} 题！继续冲刺更高纪录吧！`);
    }
}

function stopTimedGame(reason = '') {
    if (!miniPlayState.timedGame.active) return;
    miniPlayState.timedGame.active = false;
    if (miniPlayState.timedGame.timerId) {
        clearInterval(miniPlayState.timedGame.timerId);
        miniPlayState.timedGame.timerId = null;
    }
    const total = miniPlayState.timedGame.total;
    const correct = miniPlayState.timedGame.correct;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    if (reason === 'finished') {
        if (total >= 5 && accuracy >= 80) {
            grantChallengeBonusStars(3);
            setFunStatus(`限时闯关完成：${correct}/${total}，正确率 ${accuracy}% ，奖励 ⭐ 3！`);
            showRecordModal(`限时闯关完成！正确率 ${accuracy}% ，额外获得 ⭐ 3。`);
        } else {
            setFunStatus(`限时闯关结束：${correct}/${total}，正确率 ${accuracy}%。再试一次冲击奖励吧！`);
        }
    } else if (reason) {
        setFunStatus(reason);
    }
    setMiniProgress('当前没有进行中的趣味任务。');
}

function stopFindWord(reason = '') {
    if (!miniPlayState.findWord.active) return;
    miniPlayState.findWord.active = false;
    miniPlayState.findWord.targetWord = null;
    miniPlayState.findWord.correct = 0;
    if (reason) setFunStatus(reason);
    setMiniProgress('当前没有进行中的趣味任务。');
}

function pickFindWordTarget() {
    const words = (data[appState.currentCategory] || []).filter((item) => item && item.en);
    if (words.length === 0) return null;
    const next = randomPick(words);
    miniPlayState.findWord.targetWord = next;
    return next;
}

function updateFindWordProgressText() {
    if (!miniPlayState.findWord.active || !miniPlayState.findWord.targetWord) return;
    const target = miniPlayState.findWord.targetWord;
    setMiniProgress(`找找看进度：${miniPlayState.findWord.correct}/${miniPlayState.findWord.goal}。目标：${target.en}（${target.cn || target.chinese || ''}）`);
}

function grantChallengeBonusStars(count) {
    const safeCount = Math.max(0, Number(count) || 0);
    if (safeCount <= 0) return;
    rewardSystem.stars += safeCount;
    rewardSystem.saveRewards();
    updateProgressDisplay();
}

function randomPick(list) {
    if (!Array.isArray(list) || list.length === 0) return null;
    return list[Math.floor(Math.random() * list.length)];
}

function buildCardDomId(category, enWord) {
    const categorySlug = String(category || '').replace(/[^a-zA-Z0-9]/g, '');
    const wordSlug = String(enWord || '').replace(/[^a-zA-Z0-9]/g, '');
    return `card-${categorySlug}-${wordSlug}`;
}

async function runRandomCardPlay() {
    const words = data[appState.currentCategory] || [];
    if (words.length === 0) {
        setFunStatus('当前主题没有单词，先换一个主题吧。');
        return;
    }
    await setMode('flashcards');
    const chosen = randomPick(words);
    if (!chosen) return;

    const cardId = buildCardDomId(appState.currentCategory, chosen.en);
    const card = document.getElementById(cardId);
    if (card) {
        flashcardContainer.querySelectorAll('.fun-highlight-card').forEach((el) => el.classList.remove('fun-highlight-card'));
        card.classList.add('fun-highlight-card');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => card.classList.remove('fun-highlight-card'), 2400);
    }

    speechQueue.clear();
    speak(chosen.en, 0.58, 1.0, 1.0);
    setFunStatus(`已抽到：${chosen.en}（${chosen.cn || chosen.chinese || ''}）`);
}

function runSoundTrainPlay() {
    const words = [...(data[appState.currentCategory] || [])].filter((item) => item && item.en);
    if (words.length === 0) {
        setFunStatus('当前主题没有可播放的单词。');
        return;
    }
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    const queue = words.slice(0, Math.min(5, words.length));
    speechQueue.clear();
    queue.forEach((item, idx) => {
        setTimeout(() => {
            speak(item.en, 0.58, 1.0, 1.0);
        }, idx * 1150);
    });
    setFunStatus(`语音连播开始：${queue.map((w) => w.en).join(' · ')}`);
}

async function runRandomChallengePlay() {
    const categories = Object.keys(data).filter((c) => (data[c] || []).length > 0);
    if (categories.length === 0) {
        setFunStatus('没有可用主题，无法开启闯关。');
        return;
    }
    const randomCategory = randomPick(categories);
    const challengeModes = ['game', 'matching', 'dictation'];
    const randomMode = randomPick(challengeModes);
    appState.currentCategory = randomCategory;
    await setMode(randomMode);
    updateActiveUI();
    setFunStatus(`闯关已开启：主题「${randomCategory}」，模式「${randomMode === 'game' ? '看词选图' : randomMode === 'matching' ? '配对连线' : '听写训练'}」`);
}

async function runStreakChallengePlay() {
    const words = data[appState.currentCategory] || [];
    if (words.length < 4) {
        setFunStatus('连胜挑战需要当前主题至少 4 个单词。');
        return;
    }
    streakChallengeState.active = true;
    streakChallengeState.correct = 0;
    await setMode('game');
    setFunStatus(`连胜挑战开始：连续答对 ${streakChallengeState.target} 题可获得双倍星星奖励（进度 0/${streakChallengeState.target}）。`);
    setMiniProgress('当前进行：连胜挑战。');
}

async function runFindWordPlay() {
    const words = (data[appState.currentCategory] || []).filter((item) => item && item.en);
    if (words.length < 4) {
        setFunStatus('找找看至少需要当前主题有 4 个单词。');
        return;
    }
    stopTimedGame();
    streakChallengeState.active = false;
    miniPlayState.findWord.active = true;
    miniPlayState.findWord.correct = 0;
    await setMode('flashcards');
    const target = pickFindWordTarget();
    if (!target) {
        stopFindWord('当前主题无法启动找找看。');
        return;
    }
    setFunStatus('找找看开始：点击与目标词对应的卡片。');
    updateFindWordProgressText();
}

async function runTimedGamePlay() {
    const words = data[appState.currentCategory] || [];
    if (words.length < 4) {
        setFunStatus('限时闯关需要当前主题至少 4 个单词。');
        return;
    }
    stopFindWord();
    streakChallengeState.active = false;
    if (miniPlayState.timedGame.timerId) {
        clearInterval(miniPlayState.timedGame.timerId);
        miniPlayState.timedGame.timerId = null;
    }
    miniPlayState.timedGame.active = true;
    miniPlayState.timedGame.total = 0;
    miniPlayState.timedGame.correct = 0;
    miniPlayState.timedGame.endAtMs = Date.now() + miniPlayState.timedGame.durationSec * 1000;
    await setMode('game');
    setFunStatus(`限时闯关开始：${miniPlayState.timedGame.durationSec} 秒内尽量答对更多题。`);
    miniPlayState.timedGame.timerId = setInterval(() => {
        const remainMs = miniPlayState.timedGame.endAtMs - Date.now();
        if (remainMs <= 0) {
            stopTimedGame('finished');
            return;
        }
        const remainSec = Math.ceil(remainMs / 1000);
        const total = miniPlayState.timedGame.total;
        const correct = miniPlayState.timedGame.correct;
        const acc = total > 0 ? Math.round((correct / total) * 100) : 0;
        setMiniProgress(`限时闯关：剩余 ${remainSec}s，得分 ${correct}/${total}（正确率 ${acc}%）`);
    }, 1000);
}

function initFunPlayUI() {
    loadStreakBoard();
    if (!funRandomCardBtn || !funSoundTrainBtn || !funRandomChallengeBtn || !funStreakChallengeBtn || !funFindWordBtn || !funTimedGameBtn) return;
    funRandomCardBtn.addEventListener('click', runRandomCardPlay);
    funSoundTrainBtn.addEventListener('click', runSoundTrainPlay);
    funRandomChallengeBtn.addEventListener('click', runRandomChallengePlay);
    funStreakChallengeBtn.addEventListener('click', runStreakChallengePlay);
    funFindWordBtn.addEventListener('click', runFindWordPlay);
    funTimedGameBtn.addEventListener('click', runTimedGamePlay);
    recordCloseBtn?.addEventListener('click', hideRecordModal);
    recordOverlayEl?.addEventListener('click', (event) => {
        if (event.target === recordOverlayEl) hideRecordModal();
    });
}

// --- Initialization ---
function init() {
    if (perfProfile.lowPower) {
        document.body.classList.add('perf-low-power');
    }
    if (perfProfile.reducedMotion) {
        document.body.classList.add('perf-reduced-motion');
    }
    const feedbackCloseBtn = document.getElementById('dictation-feedback-close');
    if (window.AppBootstrapModule) {
        window.AppBootstrapModule.bootstrap({
            appState,
            speechQueue,
            speakWord: speak,
            gameQuestionWordEl,
            modeButtons: {
                flashcards: modeFlashcardsBtn,
                game: modeGameBtn,
                matching: modeMatchingBtn,
                dictation: modeDictationBtn
            },
            sidebar: {
                menuToggle,
                menuBackdrop,
                desktopSidebarToggle,
                sidebarToggle
            },
            matchingButtons: {
                check: matchingCheckBtn,
                reset: matchingResetBtn
            },
            dictationButtons: {
                play: dictationPlayBtn,
                submit: dictationSubmitBtn,
                skip: dictationSkipBtn,
                clear: dictationClearBtn,
                feedbackClose: feedbackCloseBtn
            },
            systems: {
                learningProgress,
                rewardSystem
            },
            handlers: {
                initAgeLevelControlsUI,
                initTtsControlsUI,
                initDashboardPanelUI,
                renderCategoryButtons,
                findFirstNonEmptyCategory,
                setMode,
                toggleMenu,
                toggleDesktopSidebar,
                checkMatchingAnswers,
                resetMatchingGame,
                playDictationWord,
                submitDictationAnswer,
                skipDictationQuestion,
                clearDictationAnswer,
                hideDictationFeedback,
                updateProgressDisplay
            }
        });
    }
    initFunPlayUI();
}

window.onload = init;


