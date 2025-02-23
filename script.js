document.getElementById("lifeStage").addEventListener("change", function() {
    const diets = {
        calves: "<strong>Colostrum (0-3 Days):</strong> 10% of body weight. <br> <strong>Milk Feeding:</strong> 4-6 liters/day. <br> <strong>Forage:</strong> Green fodder from 4 weeks. <br> <strong>Supplements:</strong> Calf probiotics (Agrivantage Probiotic), Vitamin D3 (DSM ROVIMIX).",
        heifers: "<strong>Green Fodder:</strong> Hybrid Napier, Cowpea. <br> <strong>Concentrates:</strong> Maize, barley, soybean (16-18% CP). <br> <strong>Supplements:</strong> Omega-3 additives (Megalac Omega), Yeast probiotics (Lallemand Levucell SC).",
        pregnant: "<strong>Green Fodder:</strong> Berseem, Sudan grass. <br> <strong>Concentrates:</strong> High-energy grains (20-22% CP). <br> <strong>Supplements:</strong> Chelated calcium (Rumevite High Phos), Mycotoxin binders (Trouw Nutrition Mycofix).",
        lactating: "<strong>Green Fodder:</strong> Hybrid Napier, Maize silage. <br> <strong>Concentrates:</strong> Maize, Soybean meal, Bypass protein. <br> <strong>Supplements:</strong> Rumen-protected amino acids (AminoShure), Yeast cultures (Biosprint Live Yeast).",
        dry: "<strong>Green Fodder:</strong> Controlled intake to avoid obesity. <br> <strong>Dry Fodder:</strong> Straw-based diet. <br> <strong>Supplements:</strong> Anti-ketosis feed (Ketol Extra), Immune boosters (ImmuBoost Dairy)."
    };
    
    let selectedDiet = diets[this.value] || "";
    let dietPlanDiv = document.getElementById("dietPlan");
    
    if (selectedDiet) {
        dietPlanDiv.innerHTML = selectedDiet;
        dietPlanDiv.style.display = "block";
    } else {
        dietPlanDiv.style.display = "none";
    }
});
