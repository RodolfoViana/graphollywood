import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class readData {

	  public ArrayList<String> data;
	  public String csvFile;
	  
	  public readData(String csvFile){
		  this.csvFile = csvFile;
	  }

	  public void run() {

			BufferedReader br = null;
			String line = "";
			boolean flag = false;
			boolean win = false;
			boolean descript = false;
			String awards = "";
			String id = "";
			
			id = (this.csvFile.substring(this.csvFile.length()-11, this.csvFile.length()-4));
			
			try {
				br = new BufferedReader(new FileReader(this.csvFile));
				while ((line = br.readLine()) != null) {
					if(line.contains("<h3>Academy Awards, USA</h3>")){
						flag = true;
					}
					
					if(flag){
						if(line.contains("<h3>") && !line.contains("Academy Awards, USA</h3>")){
							flag=false;
						}else{
							if(line.contains("Won")){
								win = true;
								id +=";1;1";
							}else if(line.contains("Nominated")){
								id+= ";1;0";
							}else if(line.contains("</a>        <span class=")){
								String movie_name = line.split(">")[1]; 
								id += ";" + (movie_name.substring(0, movie_name.length()-3));
								awards += id + "\n";
								id = (this.csvFile.substring(this.csvFile.length()-11, this.csvFile.length()-4));
							}else if(line.contains("award_description")){
								descript = true;
							}else if(descript){
								id += ";" + (line.substring(2, line.length()-6));
								descript = false;
							}
						}
						
					}
				}		
			
			System.out.println(awards);
				
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (br != null) {
					try {
						br.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		  }
	  
	  public static void main(String[] args) {
		
		readData obj = new readData(args[0]);
		obj.run();

	  }
	}
