function returnResults() {
    var uInput = document.forms["mainform"]["uInput"].value;
    if (uInput == "") {
        alert("Please provide an input");
        return false;
    } else {
        console.log(uInput)
        var project = document.querySelector('#results');
        project.style.opacity = 0;
            document.getElementById("results").innerHTML = getResults(uInput);
            project.style.opacity = 1;
    }
}

function getResults(uInput) {
    uInput = uInput.split(" - ").join(" ");
    uInput = uInput.split("   ").join(" ");

    if (uInput.includes(" ") == false) {
        
        processedInput = "";

        for (var i = 0; i < uInput.length; i++) {
            //Every third letter, add a space
            //Make sure not to add an extra on on the end, check against length
            if ((i + 1) % 3 == 0 && (i + 1) != uInput.length) {
                processedInput = processedInput + uInput.charAt(i) + " ";
            } else {
                processedInput = processedInput + uInput.charAt(i);
            }
        }
    } else {
        processedInput = uInput.toUpperCase();
    }

    var check = [];

    for (var i = 0; i < processedInput.length; i++) {
        if (processedInput.charAt(i) != " ") {
            check.push(processedInput.charAt(i));
        }
    }
    
    check = new Set(check);
    check = Array.from(check);

    check.sort();    
    
    if (check.length < 4) {
        return("Sequence is too short to determine type.");
    }
    var DNA = "";
    var RNA = "";
    var Codon = "";

    var checkDNA = ["A", "C", "G", "T"];
    var checkRNA = ["A", "C", "G", "U"];

    if (JSON.stringify(check) === JSON.stringify(checkDNA)) {
        DNA = processedInput;

        tDNA = switchTwo(switchTwo(DNA, "A", "T"), "G", "C");

        RNA = processedInput.split("T").join("U");

        Codon = getCodon(RNA);
    } else if (JSON.stringify(check) === JSON.stringify(checkRNA)) {
        DNA = processedInput.split("U").join("T");
        
        tDNA = switchTwo(switchTwo(DNA, "A", "T"), "G", "C");

        RNA = processedInput;

        Codon = getCodon(RNA);
    } else {
        return("Sequence is malformed or already in codon form.");
    }
    
    output = "DNA: " + DNA + "<br>tDNA: " + tDNA + "<br><br>RNA: " + RNA + "<br>Codon: " + Codon;

    return(output);

}

function getCodon(RNA) {
    var key = {'Ile':['AUU','AUC','AUA'],'Leu':['CUU','CUC','CUA','CUG','UUA','UUG'],
            'Val':['GUU','GUC','GUA','GUG'],'Phe':['UUU','UUC'],'Met':['AUG'],
            'Cys':['UGU','UGC'],'Ala':['GCU','GCC','GCA','GCG'],'Gly':['GGU','GGC','GGA','GGG'],
            'Pro':['CCA', 'CCU', 'CCC', 'CCG'],'Thr':['ACU','ACC','ACA','ACG'],
            'Ser':['UCU','UCC','UCA','UCG','AGC'],'Tyr':['UAU','UAC'],
            'Trp':['UGG'],'Gln':['CAA','CAG'],'Asn':['AAU','AAC'],'His':['CAU','CAC'],
            'Glu':['GAA','GAG'],'Asp':['GAU','GAC'],'Lys':['AAA','AAG'],
            'Arg':['CGU','CGC','CGA','CGG','AGA','AGG'],'STOP':['UAA','UAG','UGA']}

    output = "";
    var RNA_Seq = RNA.split(" ");

    for (var i = 0; i < RNA_Seq.length; i++) {
        for (item in key) {
            if (key[item].includes(RNA_Seq[i])) {
                console.log(i,item,key[item]);
                output = output + item + " ";
            }
        }
    }

    output = output.slice(0, -1); 

    return(output);
}

function switchTwo(str, A, B) {
    output = "";

    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == A) {
            output = output + B;
        } else if (str.charAt(i) == B) {
            output = output + A;
        } else {
            output = output + str.charAt(i);
        }
    }

    return(output);
}